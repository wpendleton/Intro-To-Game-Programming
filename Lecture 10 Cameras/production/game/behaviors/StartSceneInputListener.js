function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import Engine from "../../engine/Engine.js";
import SceneManager from "../SceneManager.js";

var TextBehavior = /*#__PURE__*/function (_Engine$Base$Behavior) {
  _inherits(TextBehavior, _Engine$Base$Behavior);

  function TextBehavior() {
    _classCallCheck(this, TextBehavior);

    return _possibleConstructorReturn(this, _getPrototypeOf(TextBehavior).apply(this, arguments));
  }

  _createClass(TextBehavior, [{
    key: "start",
    value: function start() {}
  }, {
    key: "update",
    value: function update() {
      if (Engine.Base.Input.getMouseButtonUp(0)) {
        SceneManager.currentScene = "CollisionScene";
      }

      if (Engine.Base.Input.getKeyUp(' ')) {
        SceneManager.currentScene = "SceneOne";
      }

      if (Engine.Base.Input.getKeyUp('a')) {
        SceneManager.currentScene = "SceneTwo";
      }

      if (Engine.Base.Input.getKeyUp('Enter')) {
        SceneManager.currentScene = "StrategyScene";
      }

      if (Engine.Base.Input.getKeyUp('r')) {
        SceneManager.currentScene = "RoomScene";
      }
    }
  }]);

  return TextBehavior;
}(Engine.Base.Behavior);

export { TextBehavior as default };