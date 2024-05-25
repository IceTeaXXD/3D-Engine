// Get all the components
let components = document.querySelectorAll(".component")

// Add click event listener to each component
components.forEach((component) => {
  component.addEventListener("click", function () {
    // Remove active class from all components
    components.forEach((c) => c.classList.remove("active"))

    // Add active class to the clicked component
    this.classList.add("active")
  })
})
