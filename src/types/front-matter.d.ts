declare module 'front-matter' {
  interface FrontMatterResult<T> {
    attributes: T;
    body: string;
    bodyBegin: number;
    frontmatter: string;
  }

  function fm<T = any>(content: string): FrontMatterResult<T>;
  export default fm;
}