export default function htmlToText(html) {
  return html.replace(/<[^>]+>/g, '');
}
