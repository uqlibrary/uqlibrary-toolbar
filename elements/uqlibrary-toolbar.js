Polymer({
  is: 'uqlibrary-toolbar',
  properties: {

    /*
    * A list of items to be displayed in more actions menu
    * item.label is displayed
    * */
    appLinks: {
      type: Array,
      value: function () {
        return [];
      }
    },

    /*
    * Flag to enable/disable search bar
    * */
    enableSearch: {
      type: Object
    },
    
    /*
    * Flag to enable/disable menu button
    * */
    enableMenu: {
      type: Object
    },

    /*
    * String to display on toolbar
    * */
    headerTitle: {
      type: String
    },

    /*
     * Autosuggestion property to display in drop down
     * */
    itemLabel: {
      type: String,
      value: 'name'
    },

    /*
     * Default text in search input field
     * */
    searchPlaceholderText: {
      type: String,
      value: 'Search...'
    },

    /*
     * Search term keyword
     * */
    searchTerm: {
      type: String,
      notify: true
    },

    /*
     * A list of suggestions to be displayed when user types in keyword
     * */
    suggestions: {
      type: Array,
      value: function () {
        return [];
      }
    },

    _searchInProgress: {
      type: Boolean,
      value: false
    }

  },
  
  ready: function () {

  },

  _showSearch: function() {
    if (this._searchInProgress === false)
      this._searchInProgress = true;
  },

  _hideSearch: function() {
    if (this._searchInProgress === true)
      this._searchInProgress = false;
  },

  _searchActivated: function(e) {
    this._hideSearch();

    var searchObject = null;

    if (typeof(e.detail) === 'object' && e.detail.hasOwnProperty(this.itemLabel)) {
      searchObject = { searchItem: e.detail };
    } else {
      searchObject = { searchTerm: this.searchTerm };
    }

    this.fire("uqlibrary-toolbar-search-submitted", searchObject );
  },

  _actionSelected: function(e) {
    this.fire('uqlibrary-toolbar-link-clicked', this.appLinks[e.detail.selected]);
  },

  _menuActivated: function () {
    this.fire('uqlibrary-toolbar-menu-clicked');
  },

  _hasAppLinks: function (appLinks) {
    return appLinks.length > 0;
  }
});