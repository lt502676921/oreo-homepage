import { useColorModeValue } from "@chakra-ui/react"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

const CodeBlock = ({ code, language = 'javascript', showLineNumbers = true }) => {
  return (
    <div
      style={{
        backgroundColor: useColorModeValue('white', 'black'),
        padding: '4px 8px',
        borderRadius: '16px',
        margin: '8px 0'
      }}
    >
      <SyntaxHighlighter
        codeTagProps={{
          className: 'font-mono text-sm'
        }}
        customStyle={{
          margin: 0,
          padding: '1rem',
          fontSize: '0.875rem',
          background: 'hsl(var(--background))',
          color: 'hsl(var(--foreground))',
          overflowX: 'auto',
          overflowWrap: 'break-word',
          wordBreak: 'break-all',
          textShadow: 'none'
        }}
        language={language}
        lineNumberStyle={{
          color: 'hsl(var(--muted-foreground))',
          paddingRight: '1rem',
          minWidth: '2.5rem'
        }}
        showLineNumbers={showLineNumbers}
      >
        {code}
      </SyntaxHighlighter>
      <style>
        {`
            .token {
              background: transparent !important;
            }
          `}
      </style>
    </div>
  )
}
export default CodeBlock
