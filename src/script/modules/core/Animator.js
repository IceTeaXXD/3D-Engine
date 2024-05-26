import { Vector3, DEGTORAD, RADTODEG } from "../math/index.js"
import { objectTransformations } from "../../app/utils/objectUtils.js"
import { Node } from "./Node.js"

export class Animator {
  /**
   * @type {Array<{position: Vector3, rotation: Vector3, scaling: Vector3}>}
   */
  frames = []
  currentFrame = 0
  lastRenderTime = 0
  fps = 10
  isPlaying = false
  isLooping = false
  isReversed = false
  /**
   * @type {Node}
   */
  object = null
  tweenTime = 0
  easingDuration = 1000
  easingFunction = null

  constructor() {
    this.frames = []
    this.currentFrame = 0
    this.lastRenderTime = 0
    this.fps = 10
    this.isPlaying = false
    this.isLooping = false
    this.isReversed = false
    this.addFrame(
      new Vector3(0, 0, 0),
      new Vector3(0, 0, 0),
      new Vector3(1, 1, 1)
    )
    this.easingFunction = this.easeLinear
  }

  addFrame(position, rotation, scale) {
    this.frames.push({ position, rotation, scale })
  }

  addNewFrame() {
    this.frames.splice(this.currentFrame + 1, 0, {
      position: this.frames[this.currentFrame].position,
      rotation: this.frames[this.currentFrame].rotation,
      scale: this.frames[this.currentFrame].scale
    })
    this.currentFrame++
    document.getElementById("frame").value = this.currentFrame + 1
  }

  editFrame(position, rotation, scale) {
    this.frames[this.currentFrame] = {
      position: new Vector3(position.x, position.y, position.z),
      rotation: new Vector3(
        rotation.x * RADTODEG,
        rotation.y * RADTODEG,
        rotation.z * RADTODEG
      ),
      scale: new Vector3(scale.x, scale.y, scale.z)
    }
  }

  removeFrame() {
    if (this.frames.length === 1) return
    this.frames.splice(this.currentFrame, 1)
    this.currentFrame--
    document.getElementById("frame").value = this.currentFrame + 1
  }

  switchFrameToNext() {
    this.currentFrame = (this.currentFrame + 1) % this.frames.length
    this.tweenTime = 0
    this.setObjectState()
  }

  switchFrameToPrevious() {
    this.currentFrame =
      (this.currentFrame - 1 + this.frames.length) % this.frames.length
    this.tweenTime = 0
    this.setObjectState()
  }

  switchFrameToStart() {
    this.currentFrame = 0
    this.tweenTime = 0
    this.setObjectState()
  }

  switchFrameToEnd() {
    this.currentFrame = this.frames.length - 1
    this.tweenTime = 0
    this.setObjectState()
  }

  swapCurrentFrameToNext() {
    if (this.currentFrame === this.frames.length - 1) return
    const temp = this.frames[this.currentFrame]
    this.frames[this.currentFrame] = this.frames[this.currentFrame + 1]
    this.frames[this.currentFrame + 1] = temp
    this.currentFrame++
    this.tweenTime = 0
    this.setObjectState()
    document.getElementById("frame").value = this.currentFrame + 1
  }

  swapCurrentFrameToPrevious() {
    if (this.currentFrame === 0) return
    const temp = this.frames[this.currentFrame]
    this.frames[this.currentFrame] = this.frames[this.currentFrame - 1]
    this.frames[this.currentFrame - 1] = temp
    this.currentFrame--
    this.tweenTime = 0
    this.setObjectState()
    document.getElementById("frame").value = this.currentFrame + 1
  }

  play() {
    this.isPlaying = !this.isPlaying
  }

  reverse() {
    this.isReversed = !this.isReversed
  }

  loop() {
    this.isLooping = !this.isLooping
  }

  animate(deltaTime) {
    if (!this.object || this.frames.length === 0 || !this.isPlaying) return

    const frameInterval = 1000 / this.fps
    this.lastRenderTime += deltaTime
    this.tweenTime += deltaTime

    if (this.lastRenderTime >= frameInterval) {
      this.lastRenderTime -= frameInterval
      this.tweenTime = 0

      if (this.isReversed) {
        this.currentFrame =
          (this.currentFrame - 1 + this.frames.length) % this.frames.length
      } else {
        this.currentFrame = (this.currentFrame + 1) % this.frames.length
      }

      if (
        !this.isLooping &&
        (this.currentFrame === this.frames.length - 1 ||
          this.currentFrame === 0)
      ) {
        this.isPlaying = false
      }
      this.setObjectState()
    }

    const nextFrame = (this.currentFrame + 1) % this.frames.length
    const progress = Math.min(this.tweenTime / this.easingDuration, 1)
    const easedProgress = this.easingFunction(progress)

    const interpolatedPosition = this.interpolate(
      this.frames[this.currentFrame].position,
      this.frames[nextFrame].position,
      easedProgress
    )

    const interpolatedRotation = this.interpolate(
      this.frames[this.currentFrame].rotation,
      this.frames[nextFrame].rotation,
      easedProgress
    )

    const interpolatedScale = this.interpolate(
      this.frames[this.currentFrame].scale,
      this.frames[nextFrame].scale,
      easedProgress
    )

    this.object.position.set(
      interpolatedPosition.x,
      interpolatedPosition.y,
      interpolatedPosition.z
    )

    this.object.rotation = new Vector3(
      DEGTORAD * interpolatedRotation.x,
      DEGTORAD * interpolatedRotation.y,
      DEGTORAD * interpolatedRotation.z
    )

    this.object.scale.set(
      interpolatedScale.x,
      interpolatedScale.y,
      interpolatedScale.z
    )
  }

  setObjectState() {
    if (!this.object || this.frames.length === 0) return

    document.getElementById("frame").value = this.currentFrame + 1
    this.object.position.set(
      this.frames[this.currentFrame].position.x,
      this.frames[this.currentFrame].position.y,
      this.frames[this.currentFrame].position.z
    )

    this.object.rotation = new Vector3(
      DEGTORAD * this.frames[this.currentFrame].rotation.x,
      DEGTORAD * this.frames[this.currentFrame].rotation.y,
      DEGTORAD * this.frames[this.currentFrame].rotation.z
    )

    this.object.scale.set(
      this.frames[this.currentFrame].scale.x,
      this.frames[this.currentFrame].scale.y,
      this.frames[this.currentFrame].scale.z
    )
    objectTransformations(this.object)
  }

  update(deltaTime, object) {
    this.object = object
    this.easingDuration = 1000 / this.fps
    if (this.isPlaying) {
      this.animate(deltaTime)
    }
  }

  easeLinear(t) {
    return t
  }

  easeCosineInOut(t) {
    return (1 - Math.cos(t * Math.PI)) / 2
  }

  easeSineInOut(t) {
    return -(Math.cos(Math.PI * t) - 1) / 2
  }

  easeQuadraticInOut(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  }

  easeCubicInOut(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  }

  easeQuarticInOut(t) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t
  }

  easeExponentialInOut(t) {
    return t < 0.5
      ? (Math.pow(2, 20 * t - 10) - 1) / 2
      : (2 - Math.pow(2, 10 - 20 * t)) / 2
  }

  easeCircularInOut(t) {
    return t < 0.5
      ? (1 - Math.sqrt(1 - 4 * t * t)) / 2
      : (Math.sqrt(1 - (2 - 2 * t) * (2 - 2 * t)) + 1) / 2
  }

  easeBackInOut(t) {
    const c1 = 1.70158
    const c2 = c1 * 1.525
    return t < 0.5
      ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
      : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2
  }

  easeElasticInOut(t) {
    const c1 = 1.70158
    const c2 = c1 * 1.525
    return t < 0.5
      ? (Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * Math.PI)) / 2
      : (Math.pow(2, -20 * t + 10) * Math.sin((-20 * t + 11.125) * Math.PI)) /
          2 +
          1
  }

  easeBounceOut(t) {
    if (t < 1 / 2.75) {
      return 7.5625 * t * t
    } else if (t < 2 / 2.75) {
      return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
    } else if (t < 2.5 / 2.75) {
      return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
    } else {
      return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375
    }
  }

  easeBounceInOut(t) {
    return t < 0.5
      ? (1 - this.easeBounceOut(1 - 2 * t)) / 2
      : (1 + this.easeBounceOut(2 * t - 1)) / 2
  }

  interpolate(start, end, t) {
    return new Vector3(
      start.x + (end.x - start.x) * t,
      start.y + (end.y - start.y) * t,
      start.z + (end.z - start.z) * t
    )
  }

  setEasingFunction(easingName) {
    switch (easingName) {
      case "Linear":
        this.easingFunction = this.easeLinear
        break
      case "Cosine":
        this.easingFunction = this.easeCosineInOut
        break
      case "Sine":
        this.easingFunction = this.easeSineInOut
        break
      case "Quadratic":
        this.easingFunction = this.easeQuadraticInOut
        break
      case "Cubic":
        this.easingFunction = this.easeCubicInOut
        break
      case "Quartic":
        this.easingFunction = this.easeQuarticInOut
        break
      case "Exponential":
        this.easingFunction = this.easeExponentialInOut
        break
      case "Circular":
        this.easingFunction = this.easeCircularInOut
        break
      case "Back":
        this.easingFunction = this.easeBackInOut
        break
      case "Elastic":
        this.easingFunction = this.easeElasticInOut
        break
      case "Bounce":
        this.easingFunction = this.easeBounceInOut
        break
      default:
        this.easingFunction = this.easeLinear
    }
  }
}
