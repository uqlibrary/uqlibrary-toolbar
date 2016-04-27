Polymer({
  is: 'uqlibrary-toolbar',
  properties: {

    appLinks: {
      type: Array,
      value: function () {
        return [];
      }
    },
    
    enableAutosuggest: {
      type: Boolean,
      value: true
    },
    
    headerTitle: {
      type: String
    },
    
    itemLabel: {
      type: String,
      value: 'name'
    },
    
    searchPlaceholderText: {
      type: String,
      value: 'Search...'
    },
    
    searchTerm: {
      type: String,
      notify: true
    },
    
    suggestions: {
      type: Array,
      value: function () {
        return [];
      }
    },

    _searchInProgress: {
      type: Boolean,
      value: false
    },

    _inputMenuTarget: {
      type: Object,
      value: function () {
        console.log(this.$.hamburgerMenuIcon);
        return this.$.hamburgerMenuIcon;
      }
    },

    _searchButtonTarget: {
      type: Object,
      value: function () {
        return this.$.searchButton;
      }
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