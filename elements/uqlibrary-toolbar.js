Polymer({
  is: 'uqlibrary-toolbar',
  properties: {
    appLinks: {
      type: Array,
      value: function () {
        return [];
      },
      notify: true
    },
    appTitle: {
      type: String,
      notify: true
    },
    appTitleLink: {
      type: String,
      notify: true
    },
    searchPlaceholderText: {
      type: String,
      value: 'Search...',
      notify: true
    },
    searchTerm: {
      type: String,
      notify: true
    },
    appBackUrl: {
      type: String,
      value: null
    },
    suggestionIndex: {
      observer: 'suggestionIndexChanged'
    },
    suggestions: {
      type: Array,
      value: function () {
        return [
        ];
      },
      notify: true,
      observer: 'suggestionsChanged'
    }
  },
  created: function () {
    this.ignoreIndexChanged = false;
  },
  ready: function () {
    var that = this;
    // by default search is not active
    this.deactivateSearch();
    this.addEventListener('keyword-changed', this.searchFieldValueChanged);
    this.addEventListener('activated', this.autocompleteChosen);
  },
  activateSearch: function () {
    var els = this.querySelectorAll('.hideSearch');

    for (var i = 0, l = els.length; i < l; i++) {
      els[i].style.display = 'none';
    }

    var sels = this.querySelectorAll('.showSearch');

    for (var si = 0, sl = sels.length; si < sl; si++) {
      sels[si].style.display = '';
    }

    this.$.searchField.show();

    var rels = this.querySelectorAll('.searchElement');

    for (var ri = 0, rl = rels.length; ri < rl; ri++) {
      rels[ri].classList.add('activeSearch');
    }
  },
  deactivateSearch: function () {
    var els = this.querySelectorAll('.hideSearch');

    for (var i = 0, l = els.length; i < l; i++) {
      els[i].style.display = '';
    }

    var sels = this.querySelectorAll('.showSearch');

    for (var si = 0, sl = sels.length; si < sl; si++) {
      sels[si].style.display = 'none';
    }

    var rels = this.querySelectorAll('.searchElement');

    for (var ri = 0, rl = rels.length; ri < rl; ri++) {
      rels[ri].classList.remove('activeSearch');
    }
  },
  menuClicked: function () {
    this.fire('uqlibrary-toolbar-menu-clicked');
  },
  goBack: function () {
    this.fire('uqlibrary-toolbar-back-clicked', this.appBackUrl);
  },
  searchFieldValueChanged: function (evt) {
    this.searchTerm = evt.detail.value;
    this.fire('uqlibrary-toolbar-search-value-changed', {value: this.searchTerm});
  },
  autocompleteChosen: function (evt) {
    this.searchTerm = evt.detail;
    this.fire('uqlibrary-toolbar-search-submitted', {searchTerm: this.searchTerm});
  },
  suggestionsChanged: function (newValue) {
    this.openSuggestions = this._hasSuggestions(newValue);
  },
  suggestionIndexChanged: function (newValue, oldValue) {
    if (!this.ignoreIndexChanged && this.suggestionIndex != null && this.suggestionIndex >= 0) {
      this.search({searchItem: this.suggestions[this.suggestionIndex]});
    }
    this.ignoreIndexChanged = false;
  },
  search: function () {
    // if the text input is visible we do a search
    if (this.$.searchField.style.display !== 'none') {
      this.fire('uqlibrary-toolbar-search-submitted', {searchTerm: this.searchTerm});
    }
    else {
      // if the text input is hidden we then display it
      this.activateSearch();
      this.suggestions = [];
    }
  },
  clearSearchForm: function () {
    this.suggestions = [];
    this.searchFieldValue = '';
  },
  linkClicked: function (e, detail, sender) {
    this.fire('uqlibrary-toolbar-link-clicked', e.target.href);
  },
  _hasAppLinks: function (appLinks) {
    return appLinks.length > 0;
  },
  _hasSuggestions: function (suggestions) {
    return suggestions.length > 0;
  },
  _getSearchField: function() {
    return this.$.searchField;
  },
  _emptyValue: function(val) {
    return !val;
  }
});