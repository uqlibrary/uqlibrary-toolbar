Polymer({
  is: 'uqlibrary-toolbar',
  properties: {
    appLinks: {
      type: Array,
      value: function () {
        return [];
      }
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
  ready: function () {
    var that = this;
    // by default search is not active
    this.deactivateSearch();
    // listen for events from the autosuggest
    this.addEventListener('keyword-changed', this.searchFieldValueChanged);
    this.addEventListener('activated', this.autocompleteChosen);
  },
  /**
   * Function called when search needs to be activated,
   * hides all non search elements, sets styles etc
   */
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

    //var rels = this.querySelectorAll('.searchElement');

    //for (var ri = 0, rl = rels.length; ri < rl; ri++) {
    //  rels[ri].classList.add('activeSearch');
    //}
  },
  /**
   * Function called when search is not activated (default state)
   * hides all search elements, resets styles etc
   */
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
  /**
   * Callback to fire notification that menu has been clicked
   */
  menuClicked: function () {
    this.fire('uqlibrary-toolbar-menu-clicked');
  },
  /**
   * Callback to fire notification that back has been clicked
   */
  backClicked: function () {
    this.fire('uqlibrary-toolbar-back-clicked', this.appBackUrl);
  },
  /**
   * A character has been typed in search
   * @param evt
   */
  searchFieldValueChanged: function (evt) {
    this.searchTerm = evt.detail.value;
    this.fire('uqlibrary-toolbar-search-value-changed', {value: this.searchTerm});
  },
  /**
   * A value has been chosen from the autocomplete dropdown
   * @param evt
   */
  autocompleteChosen: function (evt) {
    this.searchSubmitted(evt.detail);
  },
  /**
   * searchSubmitted
   *
   * @param {String}  searchTerm
   */
  searchSubmitted: function (searchTerm) {
    this.fire('uqlibrary-toolbar-search-submitted', {searchTerm: searchTerm});
  },
  /**
   * This list of suggestions has been updated, probably externally
   * @param newValue
   */
  suggestionsChanged: function (newValue) {
    this.openSuggestions = this._hasSuggestions(newValue);
  },
  /**
   * If the search input is not active, display it.  If it is
   * active, perform a search
   */
  search: function () {
    // if the text input is visible we do a search
    if (this.$.searchField.style.display !== 'none') {
      this.searchSubmitted(this.searchTerm);
    }
    else {
      // if the text input is hidden we then display it
      this.activateSearch();
      this.suggestions = [];
    }
  },
  /**
   * App link has been clicked
   *
   * @param e
   * @param detail
   * @param sender
   */
  linkClicked: function (e) {
    this.fire('uqlibrary-toolbar-link-clicked', {href: e.target.href, data: e.target.dataset.title});
  },
  /**
   * Has some app links, currently used to show/hide additional menu
   * @param appLinks
   * @returns {boolean}
   * @private
   */
  _hasAppLinks: function (appLinks) {
    return appLinks.length > 0;
  },
  /**
   * Have search suggestions been added
   *
   * @param suggestions
   * @returns {boolean}
   * @private
   */
  _hasSuggestions: function (suggestions) {
    return suggestions.length > 0;
  },
  /**
   * Does the passed in value have falsiness
   *
   * @param val
   * @returns {boolean}
   * @private
   */
  _emptyValue: function(val) {
    if (Array.isArray(val)) {
      return val.length === 0;
    }
    return !val;
  }
});