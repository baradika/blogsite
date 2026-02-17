import type { Root } from 'mdast'
import { visit } from 'unist-util-visit'

/**
 * Remark plugin to automatically convert PDF image syntax to PdfViewer component
 * Transforms: ![alt text](file.pdf) -> <PdfViewer src="file.pdf" title="alt text" />
 */
export function remarkPdfEmbed() {
  return (tree: Root) => {
    visit(tree, 'image', (node: any, index: number | undefined, parent: any) => {
      // Only process if URL ends with .pdf
      if (!node.url?.toLowerCase().endsWith('.pdf')) {
        return
      }

      // Create component with proper MDX import
      const title = node.alt || 'PDF Document'
      const src = node.url
      
      // Use mdxJsxFlowElement for proper MDX component rendering
      const componentNode = {
        type: 'mdxJsxFlowElement',
        name: 'PdfViewer',
        attributes: [
          { type: 'mdxJsxAttribute', name: 'src', value: src },
          { type: 'mdxJsxAttribute', name: 'title', value: title }
        ],
        children: []
      }

      if (parent && typeof index === 'number') {
        parent.children[index] = componentNode
      }
    })
  }
}
