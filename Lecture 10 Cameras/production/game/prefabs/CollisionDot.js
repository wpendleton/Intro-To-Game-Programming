export default {
  name: "CollisionDot",
  components: [{
    type: "CircleComponent",
    values: [{
      key: "radius",
      value: "2"
    }, {
      key: "fill",
      value: "black"
    }, {
      key: "stroke",
      value: "black"
    }]
  }, {
    type: "MovementBehavior"
  }, {
    type: "DotBehavior"
  }, {
    type: "Point"
  }]
};