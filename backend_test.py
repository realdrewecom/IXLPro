import requests
import sys
import json
from datetime import datetime

class IXLProAPITester:
    def __init__(self, base_url="https://ixl-genius.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}" if endpoint else self.api_url
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)

            success = response.status_code == expected_status
            
            result = {
                "test_name": name,
                "endpoint": endpoint,
                "method": method,
                "expected_status": expected_status,
                "actual_status": response.status_code,
                "success": success,
                "response_time": response.elapsed.total_seconds(),
                "timestamp": datetime.now().isoformat()
            }

            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    result["response_data"] = response_data
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                except:
                    result["response_data"] = response.text[:200]
                    print(f"   Response: {response.text[:200]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    result["error_data"] = error_data
                    print(f"   Error: {json.dumps(error_data, indent=2)}")
                except:
                    result["error_data"] = response.text
                    print(f"   Error: {response.text}")

            self.test_results.append(result)
            return success, response.json() if success and response.content else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            result = {
                "test_name": name,
                "endpoint": endpoint,
                "method": method,
                "expected_status": expected_status,
                "actual_status": "ERROR",
                "success": False,
                "error": str(e),
                "timestamp": datetime.now().isoformat()
            }
            self.test_results.append(result)
            return False, {}

    def test_root_endpoint(self):
        """Test API root endpoint"""
        return self.run_test("API Root", "GET", "", 200)

    def test_health_check(self):
        """Test health check endpoint"""
        return self.run_test("Health Check", "GET", "health", 200)

    def test_stats_endpoint(self):
        """Test stats endpoint"""
        success, response = self.run_test("Stats Endpoint", "GET", "stats", 200)
        
        if success:
            # Validate stats structure
            required_fields = ["users", "questions_answered", "discord_members"]
            missing_fields = [field for field in required_fields if field not in response]
            
            if missing_fields:
                print(f"⚠️  Warning: Missing fields in stats response: {missing_fields}")
                return False
            
            # Validate data types
            if not all(isinstance(response[field], int) for field in required_fields):
                print(f"⚠️  Warning: Stats fields should be integers")
                return False
                
            print(f"✅ Stats validation passed - Users: {response['users']}, Questions: {response['questions_answered']}, Discord: {response['discord_members']}")
        
        return success

    def test_pricing_endpoint(self):
        """Test pricing endpoint"""
        success, response = self.run_test("Pricing Endpoint", "GET", "pricing", 200)
        
        if success:
            # Validate pricing structure
            if "plans" not in response:
                print(f"⚠️  Warning: Missing 'plans' field in pricing response")
                return False
            
            plans = response["plans"]
            expected_plans = ["day_key", "week_key", "month_key", "3_month_key", "year_key", "service_key"]
            expected_prices = [2.50, 10.00, 25.00, 50.00, 100.00, 120.00]
            
            # Check if all expected plans exist
            missing_plans = [plan for plan in expected_plans if plan not in plans]
            if missing_plans:
                print(f"⚠️  Warning: Missing pricing plans: {missing_plans}")
                return False
            
            # Validate plan structure and prices
            for i, plan_id in enumerate(expected_plans):
                plan = plans[plan_id]
                required_fields = ["name", "price", "duration_days", "badge", "description"]
                missing_fields = [field for field in required_fields if field not in plan]
                
                if missing_fields:
                    print(f"⚠️  Warning: Plan {plan_id} missing fields: {missing_fields}")
                    return False
                
                if plan["price"] != expected_prices[i]:
                    print(f"⚠️  Warning: Plan {plan_id} has incorrect price: {plan['price']} (expected {expected_prices[i]})")
                    return False
            
            print(f"✅ Pricing validation passed - Found {len(plans)} plans with correct structure")
        
        return success

    def test_checkout_create(self):
        """Test checkout session creation"""
        checkout_data = {
            "plan_id": "day_key",
            "origin_url": "https://test.example.com",
            "email": "test@example.com"
        }
        
        success, response = self.run_test("Checkout Create", "POST", "checkout/create", 200, checkout_data)
        
        if success:
            # Validate checkout response structure
            required_fields = ["url", "session_id"]
            missing_fields = [field for field in required_fields if field not in response]
            
            if missing_fields:
                print(f"⚠️  Warning: Missing fields in checkout response: {missing_fields}")
                return False
            
            # Validate URL format (should be Stripe checkout URL)
            if not response["url"].startswith("https://checkout.stripe.com"):
                print(f"⚠️  Warning: Checkout URL doesn't appear to be a Stripe URL: {response['url']}")
                return False
            
            print(f"✅ Checkout validation passed - Session ID: {response['session_id']}")
        
        return success

    def test_checkout_invalid_plan(self):
        """Test checkout with invalid plan"""
        checkout_data = {
            "plan_id": "invalid_plan",
            "origin_url": "https://test.example.com"
        }
        
        return self.run_test("Checkout Invalid Plan", "POST", "checkout/create", 400, checkout_data)

    def test_validate_key_invalid(self):
        """Test license key validation with invalid key"""
        key_data = {
            "key": "INVALID-KEY-TEST-1234"
        }
        
        success, response = self.run_test("Validate Invalid Key", "POST", "validate-key", 200, key_data)
        
        if success and "valid" in response:
            if response["valid"] == False:
                print(f"✅ Invalid key correctly rejected")
                return True
            else:
                print(f"⚠️  Warning: Invalid key was accepted as valid")
                return False
        
        return success

    def print_summary(self):
        """Print test summary"""
        print(f"\n" + "="*60)
        print(f"📊 IXLPro API Test Summary")
        print(f"="*60)
        print(f"Tests Run: {self.tests_run}")
        print(f"Tests Passed: {self.tests_passed}")
        print(f"Tests Failed: {self.tests_run - self.tests_passed}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        if self.tests_passed < self.tests_run:
            print(f"\n❌ Failed Tests:")
            for result in self.test_results:
                if not result["success"]:
                    print(f"   - {result['test_name']}: {result.get('error', 'Status code mismatch')}")
        
        print(f"="*60)
        
        return self.tests_passed == self.tests_run

def main():
    print("🚀 Starting IXLPro API Tests...")
    print(f"Testing against: https://ixl-genius.preview.emergentagent.com")
    
    tester = IXLProAPITester()
    
    # Run all tests
    tests = [
        tester.test_root_endpoint,
        tester.test_health_check,
        tester.test_stats_endpoint,
        tester.test_pricing_endpoint,
        tester.test_checkout_create,
        tester.test_checkout_invalid_plan,
        tester.test_validate_key_invalid
    ]
    
    for test in tests:
        try:
            test()
        except Exception as e:
            print(f"❌ Test failed with exception: {e}")
    
    # Print summary and return exit code
    all_passed = tester.print_summary()
    
    # Save detailed results to file
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump({
            "summary": {
                "tests_run": tester.tests_run,
                "tests_passed": tester.tests_passed,
                "success_rate": (tester.tests_passed/tester.tests_run)*100 if tester.tests_run > 0 else 0,
                "timestamp": datetime.now().isoformat()
            },
            "detailed_results": tester.test_results
        }, f, indent=2)
    
    print(f"\n📄 Detailed results saved to: /app/backend_test_results.json")
    
    return 0 if all_passed else 1

if __name__ == "__main__":
    sys.exit(main())