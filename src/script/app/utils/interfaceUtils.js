import { Mesh, Scene, Animator } from "../../modules/core/index.js"
import { objectTransformations } from "./objectUtils.js"
import {
  BoxGeometry,
  HollowPrismGeometry,
  HollowBoxGeometry,
  TubeGeometry,
  PlaneGeometry,
  HollowPyramidGeometry
} from "../../modules/geometry/index.js"
import {
  Color,
  BasicMaterial,
  ShaderMaterial,
  PhongMaterial
} from "../../modules/materials/index.js"
import { JSONDeserializer } from "../../modules/core/index.js"
import { DirectionalLight } from "../../modules/light/DirectionalLight.js"
import { lightTransformations } from "./lightUtils.js"
export class Interface {
  /**
   * @param {Scene} scene
   * @param {Animator} animator
   * @param {DirectionalLight} light
   */
  constructor(scene, animator, light) {
    this.scene = scene
    this.sceneLight = light
    this.animator = animator
    lightTransformations(this.sceneLight)
    this.selectedObject = { object: null }
    this.meshCounter = 0 // Counter to assign unique IDs to meshes
    this.initEventListeners()
    this.initRootComponent() // Initialize the root "All" component
    this.loadUtil()
    this.deleteSelectedObject()
  }

  /**
   * Initialize event listeners for geometry buttons.
   */
  initEventListeners() {
    document
      .getElementById("Box")
      .addEventListener("click", () => this.addGeometry("Box"))
    document
      .getElementById("Cube")
      .addEventListener("click", () => this.addGeometry("Cube"))
    document
      .getElementById("Tube")
      .addEventListener("click", () => this.addGeometry("Tube"))
    document
      .getElementById("Prism")
      .addEventListener("click", () => this.addGeometry("Prism"))
    document
      .getElementById("Pyramid")
      .addEventListener("click", () => this.addGeometry("Pyramid"))
    document
      .getElementById("Brick")
      .addEventListener("click", () => this.addGeometry("Brick"))
    document
      .getElementById("Wood")
      .addEventListener("click", () => this.addGeometry("Wood"))
    document
      .getElementById("Glass")
      .addEventListener("click", () => this.addGeometry("Glass"))
  }

  /**
   * Initialize the root "All" component.
   */
  initRootComponent() {
    const allComponent = document.createElement("div")
    allComponent.classList.add("component")
    allComponent.dataset.level = 0
    allComponent.dataset.meshId = "root"
    allComponent.innerHTML = `<a>Scene</a>`
    allComponent.style.fontWeight = "bold" // Highlight the "All" component
    ComponentUI.container.prepend(allComponent) // Add it at the beginning of the list

    allComponent.addEventListener("click", () => {
      this.selectAllComponents()
    })

    // Automatically select the "All" component
    allComponent.click()
  }

  /**
   * Select all components and their children.
   */
  selectAllComponents() {
    const allComponents = document.querySelectorAll(".component")
    allComponents.forEach((component) => component.classList.add("active"))
    this.selectedObject.object = this.scene
    objectTransformations(this.selectedObject.object)
  }

  /**
   * Add geometry to the scene based on type.
   *
   * @param {string} type
   */
  addGeometry(type) {
    const color = new Color()
    let geometry
    let material = new PhongMaterial()

    switch (type) {
      case "Box":
        material = new PhongMaterial({
          lightPosition: this.sceneLight.position
        })
        geometry = new BoxGeometry(2, 2, 2)
        break
      case "Cube":
        material = new PhongMaterial({
          lightPosition: this.sceneLight.position
        })
        geometry = new HollowBoxGeometry(2, 2, 2, 0.2, 10)
        break
      case "Tube":
        geometry = new TubeGeometry(1, 2, 2, 10, 10)
        break
      case "Prism":
        material = new PhongMaterial({
          lightPosition: this.sceneLight.position
        })
        geometry = new HollowPrismGeometry(2, 2, 2, 0.3, 5)
        break
      case "Pyramid":
        geometry = new HollowPyramidGeometry(2, 2, 2, 0.2)
        material = new PhongMaterial({})
        break
      case "Brick":
        material = new PhongMaterial({
          lightPosition: this.sceneLight.position,
          useTexture: true,
          texture: "brick"
        })
        geometry = new BoxGeometry(2, 2, 2)
        break
      case "Wood":
        material = new PhongMaterial({
          lightposition: this.sceneLight.position,
          useTexture: true,
          texture: "wood"
        })
        geometry = new BoxGeometry(2, 2, 2)
        break
      case "Glass":
        material = new PhongMaterial({
          lightPosition: this.sceneLight.position,
          useTexture: true,
          texture: "glass"
        })
        geometry = new BoxGeometry(2, 2, 2)
        break
      default:
        console.error("Unknown geometry type")
        return
    }

    const mesh = new Mesh(geometry, material)
    mesh.id = this.meshCounter++ // Assign a unique ID to the mesh
    if (this.selectedObject.object) {
      this.selectedObject.object.add(mesh)
    } else {
      this.scene.add(mesh)
    }
    this.selectedObject.object = mesh
    objectTransformations(this.selectedObject.object)

    const parentComponent = ComponentUI.getComponentElement(
      this,
      this.selectedObject.object.parent
    )
    const level = parentComponent
      ? parseInt(parentComponent.dataset.level) + 1
      : 1
    const componentName = `${type}-${mesh.id}`
    ComponentUI.createComponent(
      componentName,
      mesh,
      level,
      this,
      parentComponent
    )
  }

  processChild(child, parent = null) {
    if (parent) {
      parent.add(child)
    } else {
      this.scene.add(child)
    }

    this.selectedObject.object = child

    const parentComponent = ComponentUI.getComponentElement(this, child.parent)
    const level = parentComponent
      ? parseInt(parentComponent.dataset.level) + 1
      : 1
    const componentName = `${child.type}-${this.meshCounter}`
    child.id = this.meshCounter++
    ComponentUI.createComponent(
      componentName,
      child,
      level,
      this,
      parentComponent
    )

    child.children.forEach((grandchild) => this.processChild(grandchild, child))
  }

  loadUtil() {
    const loadButton = document.getElementById("load")
    loadButton.addEventListener("click", () => {
      var input = document.createElement("input")
      input.type = "file"
      input.accept = "application/json"
      document.body.appendChild(input)
      input.style.display = "none"
      input.click()
      input.addEventListener("change", (event) => {
        const file = event.target.files[0]
        const reader = new FileReader()
        reader.onload = (e) => {
          const json = JSON.parse(e.target.result)
          if (json.scene) {
            const res = JSONDeserializer(json.scene)
            res.children.forEach((child) => this.processChild(child))
          } else if (json.animator) {
            this.animator.fromJSON(json.animator)
          } else {
            console.error("Invalid JSON format")
          }
        }
        reader.readAsText(file)
      })
    })
  }

  deleteSelectedObject() {
    const delButton = document.getElementById("delete")
    delButton.addEventListener("click", () => {
      if (
        !this.selectedObject.object ||
        this.selectedObject.object === this.scene
      ) {
        console.warn("No object selected or trying to delete the root object.")
        return
      }

      const selectedObject = this.selectedObject.object
      const parent = selectedObject.parent

      if (parent) {
        parent.remove(selectedObject)
      }

      this._deleteComponentAndChildren(selectedObject)

      this.selectedObject.object = this.scene
      this.selectAllComponents()
    })
  }

  /**
   * Recursively delete a component and its children from the UI.
   *
   * @param {Mesh} object
   */
  _deleteComponentAndChildren(object) {
    const componentElement = ComponentUI.getComponentElement(this, object)
    if (componentElement) {
      const children = Array.from(
        document.querySelectorAll(`.component[data-mesh-id="${object.id}"]`)
      )
      children.forEach((child) => child.remove())
      componentElement.remove()
    }

    object.children.forEach((child) => {
      this._deleteComponentAndChildren(child)
    })
  }
  /**
   * Find an object in the scene by its ID.
   *
   * @param {number} id
   * @returns {Mesh | null}
   */
  getObjectById(id) {
    return this._findObjectById(this.scene, id)
  }

  /**
   * Recursively find an object by its ID.
   *
   * @param {Mesh} parent
   * @param {number} id
   * @returns {Mesh | null}
   */
  _findObjectById(parent, id) {
    if (parent.id === id) {
      return parent
    }
    for (let child of parent.children) {
      const result = this._findObjectById(child, id)
      if (result) {
        return result
      }
    }
    return null
  }
}

export class ComponentUI {
  static container = document.querySelector(".components")

  /**
   * Create a component.
   *
   * @param {string} name
   * @param {Mesh} mesh
   * @param {number} level
   * @param {Interface} uiInterface
   * @param {HTMLElement|null} parentComponent
   */
  static createComponent(
    name,
    mesh,
    level = 0,
    uiInterface,
    parentComponent = null
  ) {
    let component = document.createElement("div")
    component.classList.add("component")
    component.dataset.level = level
    component.dataset.meshId = mesh.id
    component.style.marginLeft = `${level * 20}px` // Adjust the indentation as needed
    component.innerHTML = `<a>${name}</a>`

    if (parentComponent) {
      parentComponent.after(component) // Insert the new component directly after the parent
    } else {
      this.container.appendChild(component) // Add to the end if there's no parent
    }

    component.addEventListener("click", (event) => {
      event.stopPropagation() // Prevent event propagation
      let components = document.querySelectorAll(".component")
      components.forEach((c) => c.classList.remove("active"))
      this.selectComponentAndChildren(component, uiInterface)
      uiInterface.selectedObject.object = mesh
      objectTransformations(uiInterface.selectedObject.object)
    })
  }

  /**
   * Recursively add the 'active' class to the selected component and its children.
   *
   * @param {HTMLElement} component
   * @param {Interface} uiInterface
   */
  static selectComponentAndChildren(component, uiInterface) {
    component.classList.add("active")
    const meshId = parseInt(component.dataset.meshId)
    const mesh = uiInterface.getObjectById(meshId)
    if (mesh && mesh.children.length > 0) {
      mesh.children.forEach((child) => {
        const childComponent = this.getComponentElement(this, child)
        if (childComponent) {
          this.selectComponentAndChildren(childComponent, uiInterface)
        }
      })
    }
  }

  /**
   * Get the DOM element corresponding to a mesh.
   *
   * @param {Mesh} mesh
   * @returns {HTMLElement | null}
   */
  static getComponentElement(uiInterface, mesh) {
    if (!mesh) return null

    if (mesh === uiInterface.scene) {
      return document.querySelector(".component[data-all]")
    }

    const components = document.querySelectorAll(".component")
    for (let component of components) {
      if (component.dataset.meshId === mesh.id.toString()) {
        return component
      }
    }
    return null
  }
}
