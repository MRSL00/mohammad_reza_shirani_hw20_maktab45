const $button = document.querySelector("#sidebar-toggle");
const $wrapper = document.querySelector("#wrapper");

$button.addEventListener("click", (e) => {
  e.preventDefault();
  $wrapper.classList.toggle("toggled");
});

$(document).ready(function () {
  const options = {
    theme: "snow",
  };
  const editor = new Quill("#quillEditor", options);
  $("#form").submit(function (e) {
    body = document.querySelector("input[name=content]");
    body.value = $(".ql-editor").html();
    
  });

  // #################### cover photo ####################
  // function readURL(input) {
  //   if (input.files && input.files[0]) {
  //     const reader = new FileReader();
  //     reader.onload = function (e) {
  //       $("#imagePreview").css(
  //         "background-image",
  //         "url(" + e.target.result + ")"
  //       );
  //       $("#imagePreview").hide();
  //       $("#imagePreview").fadeIn(650);
  //     };
  //     reader.readAsDataURL(input.files[0]);
  //   }
  // }
  // $("#imageUpload").change(function () {
  //   readURL(this);
  // });
});
