# uqlibrary-toolbar

uqlibrary-toolbar displays a toolbar which takes an initialisation state, most fundamentally a title, but also 
including search and more actions display

## Events

| Event type                            | Event data             | Description                                                                                   |
| ------------------------------------- | ---------------------- | --------------------------------------------------------------------------------------------- |
| uqlibrary-toolbar-menu-clicked        | na                     | Hamburger menu on left is tapped                                                              |
| uqlibrary-toolbar-link-clicked        | item from appLinks     | Link in more menu on right clicked                                                            |
| uqlibrary-toolbar-search-submitted    | Submitted value        | The user has either pressed enter, clicked the search icon, or selected from the autocomplete |

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