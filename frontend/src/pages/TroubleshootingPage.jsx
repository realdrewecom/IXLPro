import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Search, ExternalLink, Info } from "lucide-react";

const troubleshootingArticles = [
  {
    id: "failed-to-load",
    title: "WHY DOES IT SAY IXLPRO FAILED TO LOAD?",
    date: "12/30/2024, 1:27:02 AM",
    content: `If you see this message, it's usually safe to ignore and click Close. However, if IXLPro still doesn't load, it could be due to your Wi-Fi blocking the site, or you may need to try the following steps:

1. Reload the page.
2. Clear your browser cache (instructions below).
3. Reinstall the script.
4. Try using a different browser (suggestions below).
5. Close the page and reopen it.

**How to clear your cache:**

1. Press \`Ctrl + Shift + Delete\` to open the clear browsing data window, or type \`chrome://settings/clearBrowserData\` in your browser's address bar.
2. In the Time range dropdown, select **All time**.
3. Check the box for **Cached images and files**.
4. Click **Clear data**.

*Note: Each browser may have slightly different steps to clear cache, so be sure to follow the instructions specific to your browser.*

**Suggested Browsers:**
• Brave
• Opera GX
• Edge

If you continue experiencing issues, feel free to reach out to our support team on the Discord server. We'll be happy to help!`
  },
  {
    id: "tampermonkey-not-working",
    title: "WHY IS TAMPERMONKEY NOT WORKING?",
    date: "12/30/2024, 1:26:50 AM",
    content: `It's possible that Tampermonkey may not always function correctly. If you're encountering issues, I recommend trying Violentmonkey instead by following these steps:

1. **Install Violentmonkey:** Visit the Chrome Web Store and download the Violentmonkey extension. Once installed, pin it to your browser for easy access.

2. **Install the IXLPro script:** In the browser's search bar, enter the following URL: \`https://ixlpro.net/ixlpro.user.js\` and install the script.

3. **Access IXL:** Once the script is installed, head over to IXL, and you should be good to go.

For a more detailed tutorial, you can also refer to our video guide.

If you continue experiencing issues, feel free to reach out to our support team on the Discord server. We'll be happy to help!`
  },
  {
    id: "getting-logged-out",
    title: "WHY DO I KEEP GETTING LOGGED OUT?",
    date: "3/1/2025, 4:58:18 PM",
    content: `1. Open the Violentmonkey dashboard or Tampermonkey and delete the script.
2. Go to the download page and reinstall it.
3. Refresh your tab, and it should work again.

**Other Method:**

Switch to a different browser, such as Chrome, Brave, etc.

If you continue experiencing issues, feel free to reach out to our support team on the Discord server. We'll be happy to help!`
  },
  {
    id: "menu-not-appearing",
    title: "WHY ISN'T MY MENU APPEARING?",
    date: "12/30/2024, 1:26:42 AM",
    content: `Is the IXLPro menu not appearing on your screen? To resolve this, I recommend trying the following steps:

1. **Unhide the menu:** Press \`CTRL+SHIFT+H\` on your keyboard. This should unhide the IXLPro menu, making it visible again.

2. **Reset the menu:** If the above step doesn't work, try pressing \`CTRL+SHIFT+R\`. This will reset the menu, which may help resolve any display issues.

3. **Clear browser cache:** Sometimes the menu can load incorrectly, resulting in a portion of code being corrupted. An easy way to fix this is by clearing your browser cache.

If you've tried these steps and the menu is still not appearing, please feel free to contact our support team in the Discord server for further assistance. We'll be happy to help you troubleshoot the issue and get your menu working again.`
  },
  {
    id: "find-key",
    title: "WHERE DO I FIND MY KEY?",
    date: "12/30/2024, 1:26:26 AM",
    content: `If you purchased an IXLPro key and are struggling to find it check the following places:

• The inbox of the email address you entered when purchasing.
• The spam folder of the email address you entered when purchasing.

If you still can't find it, contact support in our Discord server.

*Typos are common in email addresses when ordering keys. If possible, check your PayPal receipt for a typo to quicker identify the issue.*

Click here to purchase an IXLPro key.`
  }
];

const TroubleshootingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = troubleshootingArticles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = (content) => {
    // Parse markdown-like content
    return content.split('\n').map((line, index) => {
      // Bold text
      let processedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-medium">$1</strong>');
      // Italic text
      processedLine = processedLine.replace(/\*(.*?)\*/g, '<em>$1</em>');
      // Code
      processedLine = processedLine.replace(/`(.*?)`/g, '<code class="bg-zinc-800 px-1.5 py-0.5 rounded text-sm">$1</code>');
      // Bullet points
      if (processedLine.startsWith('•')) {
        processedLine = `<span class="text-blue-400">•</span>${processedLine.slice(1)}`;
      }
      
      return (
        <p 
          key={index} 
          className={`${line === '' ? 'h-4' : ''}`}
          dangerouslySetInnerHTML={{ __html: processedLine }}
        />
      );
    });
  };

  return (
    <div className="min-h-screen bg-[#09090b]" data-testid="troubleshooting-page">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center space-x-2 text-zinc-400">
                <Info className="w-4 h-4" />
                <span className="text-sm">All posts are authored and verified by IXLPro support staff.</span>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="SEARCH POSTS..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 w-full md:w-64"
                  data-testid="search-input"
                />
              </div>
            </div>
          </motion.div>

          {/* Blue accent line */}
          <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-8"></div>

          {/* Articles */}
          <div className="space-y-8">
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6"
                data-testid={`article-${article.id}`}
              >
                {/* Article Header */}
                <div className="flex items-start justify-between mb-4">
                  <h2 
                    className="text-xl font-bold text-white"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    {article.title}
                    <a href={`#${article.id}`} className="ml-2 text-zinc-500 hover:text-blue-400">
                      <ExternalLink className="w-4 h-4 inline" />
                    </a>
                  </h2>
                </div>

                {/* Article Content */}
                <div className="text-zinc-400 space-y-2 leading-relaxed">
                  {renderContent(article.content)}
                </div>

                {/* Article Footer */}
                <div className="mt-6 pt-4 border-t border-zinc-800">
                  <p className="text-zinc-500 text-sm">{article.date}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No results */}
          {filteredArticles.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-zinc-400">No articles found matching your search.</p>
            </motion.div>
          )}

          {/* Discord Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <p className="text-zinc-400 mb-4">Still need help?</p>
            <a
              href="https://discord.gg/ixlpro"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-[#5865F2] hover:bg-[#4752C4] text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              data-testid="discord-support-btn"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/>
              </svg>
              <span>Join Discord Support</span>
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TroubleshootingPage;
