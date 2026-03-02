/**
 * Lists of document types for reference fields
 * Used to define which document types can be referenced in various contexts
 */

export const Lists = {
  /**
   * F5.com page documents that can be referenced for internal links
   * Excludes landing pages, test pages, and system pages
   */
  f5ComPageDocuments: [
    {type: 'f5GenericContentPage'},
    {type: 'f5GoPage'},
    {type: 'f5AppworldPage'},
    {type: 'f5CaseStudy'},
    {type: 'f5PressRelease'},
    {type: 'f5Events'},
    {type: 'f5GlossaryTerm'},
    {type: 'f5Demo'},
    {type: 'f5BlogPost'},
    {type: 'f5OctoBlogPost'},
    {type: 'f5BlogSeries'},
    {type: 'f5BlogPillar'},
  ],

  /**
   * Labs page documents that can be referenced for internal links
   */
  labsPageDocuments: [
    {type: 'labsArticle'},
    {type: 'labsLandingPage'},
    {type: 'labsHomePage'},
  ],
}

