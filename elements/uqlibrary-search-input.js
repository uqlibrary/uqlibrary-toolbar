(function () {
  'use strict';

  Polymer({
    is: 'uqlibrary-search-input',
    behaviors: [
      Polymer.NeonAnimatableBehavior,
      Polymer.NeonAnimationRunnerBehavior
    ],
    properties: {
      suggestions: {
        type: Array,
        value: function () {
          return [];
        }
      },
      label: {
        type: String,
        value: 'Search'
      },
      opened: {
        type: Boolean
      },
      animationConfig: {
        value: function () {
          return {
            'entry': {
              name: 'scale-up-animation',
              node: this
            },
            'exit': {
              name: 'scale-down-animation',
              node: this
            }
          }
        }
      }
    },
    listeners: {
      'neon-animation-finish': '_onNeonAnimationFinish'
    },
    ready: function () {
      this.listen(this.$.uai, 'keyword-changed', '_refireEvent');
    },
    _refireEvent: function (e) {
      this.fire(e.type, e.detail);
    },
    show: function () {
      this.opened = true;
      this.style.display = 'inline-block';
      // run scale-up-animation
      this.playAnimation('entry');
    },
    hide: function () {
      this.opened = false;
      // run fade-out-animation
      this.playAnimation('exit');
    },
    _onNeonAnimationFinish: function () {
      if (!this.opened) {
        this.style.display = 'none';
      }
    }
  });
})();
