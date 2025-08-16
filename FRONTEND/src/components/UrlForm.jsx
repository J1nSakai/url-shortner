import React, { useState } from "react";
import { getCustomShorturl, getShorturl } from "../api/shorturl.api";
import { useSelector } from "react-redux";
import { queryClient } from "../main";

const UrlForm = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const { isAutheticated } = useSelector((state) => state.auth);
  console.log(isAutheticated);

  const handleSubmit = async () => {
    if (!url) return;

    setLoading(true);
    setError("");

    try {
      if (!(customSlug === "")) {
        const data = await getCustomShorturl(url, customSlug);
        setShortUrl(data);
        queryClient.invalidateQueries({ queryKey: ["userUrls"] });
        return true;
      }
      const data = await getShorturl(url);

      setShortUrl(data);
      queryClient.invalidateQueries({ queryKey: ["userUrls"] });
    } catch (err) {
      setError(err.message);
      setShortUrl(""); // Only clear on error
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
        URL Shortener
      </h1>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="url"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Enter your URL
          </label>
          <input
            type="url"
            id="url"
            placeholder="www.example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            required
          />
        </div>

        {isAutheticated && (
          <div>
            <label
              htmlFor="customSlug"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Custom Slug (Optional)
            </label>
            <input
              type="text"
              id="customSlug"
              placeholder="Enter custom slug"
              value={customSlug}
              onChange={(e) => setCustomSlug(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading || !url}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </button>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-red-400 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        )}

        {shortUrl && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-sm font-medium text-green-800 mb-2">
              Your shortened URL:
            </h3>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={shortUrl}
                readOnly
                className="flex-1 px-3 py-2 bg-white border border-green-300 rounded text-sm"
              />
              <button
                onClick={copyToClipboard}
                className={`px-3 py-2 text-white text-sm rounded transition-all duration-300 ${
                  copied
                    ? "bg-emerald-500 scale-105"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {copied ? (
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Copied!
                  </span>
                ) : (
                  "Copy"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlForm;
