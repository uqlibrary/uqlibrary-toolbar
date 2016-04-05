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
        return [];
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
    this.$.searchField.addEventListener('value-changed', function (e) {
      that.searchFieldValueChanged(e.detail.value);
    });
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
  searchFieldValueChanged: function (value) {
    this.fire('uqlibrary-toolbar-search-value-changed', {value: value});
  },
  suggestionsChanged: function (newValue, oldValue) {
    var that = this;
    //this.$.suggestionSelector.clearSelection();
    this.set('$.suggestionSelector.selected', null);
    this.suggestionIndex = -1;
    this.async(function () {
      that.openSuggestions = that.suggestions.length > 0;
    }, 100);
  },
  suggestionIndexChanged: function (newValue, oldValue) {
    if (!this.ignoreIndexChanged && this.suggestionIndex != null && this.suggestionIndex >= 0) {
      this.search({searchItem: this.suggestions[this.suggestionIndex]});
    }
    this.ignoreIndexChanged = false;
  },
  onSearchKeys: function (ev) {
    switch (ev.detail.key) {
    case 'esc':
      this.suggestions = [];
      break;
    case 'enter':
      if (this.suggestionIndex >= 0) {
        this.search({searchItem: this.suggestions[this.suggestionIndex]});
      }
      else {
        this.search();
      }
      break;
    case 'up':
      this.ignoreIndexChanged = true;
      this.suggestionIndex = this.suggestionIndex >= 0 ? this.suggestionIndex - 1 : -1;
      break;
    case 'down':
      this.ignoreIndexChanged = true;
      this.suggestionIndex = this.suggestions.length - 1 > this.suggestionIndex ? this.suggestionIndex + 1 : this.suggestionIndex;
      break;
    }
  },
  search: function () {
    var searchInput = this.$.searchField;

    // if the text input is visible we do a search
    if (searchInput.style.display !== 'none') {
      this.fire('uqlibrary-toolbar-search-submitted', {searchTerm: searchInput.value});
    }
    else {
      // if the text input is hidden we then display it
      this.activateSearch();
    }

    this.suggestions = [];
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
  _getSearchFieldWrapper: function() {
    return this.$.searchFieldWrapper;
  },
  _emptyValue: function(val) {
    return !val;
  }
});