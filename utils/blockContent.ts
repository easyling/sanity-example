/**
 * Extracts and trims text content from Sanity block content array for preview purposes
 * @param content - Array of block content items
 * @param maxLength - Maximum length of the preview text (default: 50)
 * @returns Trimmed text string or empty string if no text found
 */
export function trimBlockContentForPreview(
  content: any[],
  maxLength: number = 50
): string {
  if (!content || !Array.isArray(content)) {
    return ''
  }

  // Find the first block element
  const firstBlock = content.find((block) => block._type === 'block')
  
  if (!firstBlock || !firstBlock.children) {
    return ''
  }

  // Extract text from span children
  const text = firstBlock.children
    .filter((child: any) => child._type === 'span')
    .map((span: any) => span.text || '')
    .join('')
    .trim()

  if (!text) {
    return ''
  }

  // Trim to max length and add ellipsis if truncated
  if (text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`
  }

  return text
}

