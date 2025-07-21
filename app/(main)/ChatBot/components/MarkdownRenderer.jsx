'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import 'highlight.js/styles/github-dark.css'

const MarkdownRenderer = ({ children }) => {
  return (
    <div className="prose prose-invert max-w-none text-base leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          h2: ({ node, ...props }) => (
            <h2 className="text-xl font-bold mt-6 mb-2" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-lg font-semibold mt-4 mb-2" {...props} />
          ),
          li: ({ children }) => <li className="ml-4 list-disc">{children}</li>,
          code({ node, inline, className, children, ...props }) {
            return inline ? (
              <code className="bg-muted px-1 py-0.5 rounded text-purple-500 text-sm">
                {children}
              </code>
            ) : (
              <pre className="relative bg-black text-white p-4 rounded-lg overflow-x-auto my-4">
                <code className={className} {...props}>{children}</code>
                <button
                  className="absolute top-2 right-2 text-xs bg-white text-black px-2 py-0.5 rounded"
                  onClick={() => navigator.clipboard.writeText(children)}
                >
                  Copy
                </button>
              </pre>
            )
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownRenderer
