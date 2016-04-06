# uqlibrary-toolbar

uqlibrary-toolbar displays a toolbar which takes an initialisation state, most fundamentally a title, but also 
including search and a back event

## Events

| Event type                            | Event data             | Description                                                                                   |
| ------------------------------------- | ---------------------- | --------------------------------------------------------------------------------------------- |
| uqlibrary-toolbar-menu-clicked        | na                     | Hamburger menu on left selected                                                               |
| uqlibrary-toolbar-back-clicked        | Href of back link      | Back arrow clicked                                                                            |
| uqlibrary-toolbar-link-clicked        | Href of link           | Link in more menu on right clicked                                                            |
| uqlibrary-toolbar-search-value-changed| Current search value   | a character has been typed in search                                                          |
| uqlibrary-toolbar-search-submitted    | Submitted value        | The user has either pressed enter, clicked the search icon, or selected from the autocomplete |

Example of full documentation can be found at [GitHub Pages](http://uqlibrary.github.io/uqlibrary-toolbar).

### Getting Started
```sh
npm install && bower install
```

### Developing
- Please adhere to the Polymer code style guide provided at [Style Guide](http://polymerelements.github.io/style-guide/). 
- Colors and common styles are imported (bower install) from [uqlibrary-styles](http://github.com/uqlibrary/uqlibrary-styles).
- GitHub pages should be updated after every commit to Master by running the "generate-gh-pages.sh" in the /bin/ directory

### Testing
Tests are run using the Web Component Tester. Either navigate to /tests/index.html in a browser or using the command line:
```sh
wct --local all
```