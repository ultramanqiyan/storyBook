# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - navigation [ref=e2]:
    - link "StoryBook" [ref=e3] [cursor=pointer]:
      - /url: index.html
    - generic [ref=e4]:
      - link "My Library" [ref=e5] [cursor=pointer]:
        - /url: bookshelf.html
      - link "Sign Out" [ref=e6] [cursor=pointer]:
        - /url: "#"
  - generic [ref=e8]:
    - generic [ref=e10]: The Lost Kingdom
    - generic [ref=e12]:
      - generic [ref=e13]:
        - generic [ref=e15]: 🗺️
        - generic [ref=e16]:
          - generic [ref=e17]: Adventure
          - heading "The Lost Kingdom" [level=2] [ref=e18]
          - generic [ref=e19]:
            - generic [ref=e20]: 📜 20 Chapters
            - generic [ref=e21]: 👥 5 Characters
            - generic [ref=e22]: 📖 15% Progress
          - generic [ref=e23]:
            - link "Continue Reading" [ref=e24] [cursor=pointer]:
              - /url: chapter.html
            - link "Direct New Chapter" [ref=e25] [cursor=pointer]:
              - /url: director.html
      - generic [ref=e26]:
        - button "📜 Chapters" [ref=e27] [cursor=pointer]
        - button "👥 Characters" [ref=e28] [cursor=pointer]
        - button "🎭 Plots" [ref=e29] [cursor=pointer]
  - generic [ref=e32]: Book not found
```