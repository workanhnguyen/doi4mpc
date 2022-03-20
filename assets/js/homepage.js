function getParent(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  }
  
  //Hàm xử lý
  let containerElement;
  if (localStorage.getItem("contents")) {
    containerElement = JSON.parse(localStorage.getItem("contents"));
    console.log(containerElement);
  } else {
    containerElement = [];
    console.log("vô còn lại");
  }
  var localKey = "contents";
  const inputElement = document.querySelector(".input-placeholder");
  const modal = document.querySelector(".modal");
  const postForm = modal.querySelector(".post-form");
  const deleteForm = modal.querySelector(".delete-form");
  const exitModal = document.querySelector(".modal-body .title-container i");
  const textareaElement = document.querySelector(".modal-body textarea");
  const postBtn = document.querySelector(".modal-body .post-btn span");
  let mainContent = document.querySelector(".main__content.main__item");
  const yesBtn = deleteForm.querySelector(".yes");
  const noBtn = deleteForm.querySelector(".no");
  
  function setPost() {
    inputElement.onclick = () => {
      modal.classList.add("active");
      postForm.classList.add("active");
      if (modal.classList.contains("active")) {
        exitModal.onclick = () => {
          modal.classList.remove("active");
          postForm.classList.remove("active");
        };
  
        textareaElement.focus();
        textareaElement.onkeydown = () => {
          let refreshId = setInterval(function () {
            if (textareaElement.value == "") {
              console.log("rỗng");
              postBtn.style.backgroundColor = "white";
              postBtn.style.color = "rgba(65, 21, 21, 0.15)";
              postBtn.style.cursor = "not-allowed";
  
              clearInterval(refreshId);
            } else {
              postBtn.style.backgroundColor = "purple";
              postBtn.style.color = "black";
              postBtn.style.cursor = "pointer";
  
              clearInterval(refreshId);
            }
  
            // Post bài
            const valueTextarea = textareaElement.value;
            if (postBtn.style.cursor == "pointer") {
              postBtn.onclick = () => {
                const copyofStatus = document
                  .querySelector(".main__content-container")
                  .cloneNode(true);
                copyofStatus.querySelector(".main__content-status").innerText =
                  valueTextarea;
                copyofStatus
                  .querySelector(".main__content-delete")
                  .classList.add("active");
                mainContent.insertBefore(copyofStatus, mainContent.children[1]);
  
                containerElement.push(valueTextarea);
                console.log(containerElement);
                localStorage.setItem(localKey, JSON.stringify(containerElement));
                modal.classList.remove("active");
                postForm.classList.remove("active");
                setTimeout(function () {
                  textareaElement.value = "";
                }, 100);
  
                setHeart();
  
                //Set delete
  
                deleteContent(yesBtn, noBtn, deleteForm, modal);
              };
            }
          }, 100);
        };
      }
    };
  }
  
  function setHeart() {
    const contentHeart = document.querySelectorAll(".main__content-heart");
  
    contentHeart.forEach((heart) => {
      heart.onclick = () => {
        if (heart.querySelector("i").style.color == "red") {
          heart.querySelector("i").style.color = "black";
        } else {
          heart.querySelector("i").style.color = "red";
        }
      };
    });
  }
  
  function deleteContent(yesBtn, noBtn, deleteForm, modal) {
    const deleteItems = document.querySelectorAll(".main__content-delete i");
    console.log(deleteItems);
  
    deleteItems.forEach((item) => {
      item.onclick = () => {
        modal.classList.add("active");
        deleteForm.classList.add("active");
  
        yesBtn.onclick = () => {
          const parent = getParent(item, ".main__content-container");
          parent.remove();
          modal.classList.remove("active");
          deleteForm.classList.remove("active");
  
          const statusElement = parent.querySelector(".main__content-status");
          containerElement.forEach((element, index) => {
            if (element == statusElement.innerText) {
              containerElement.splice(index, 1);
              console.log(containerElement);
              localStorage.setItem(localKey, JSON.stringify(containerElement));
            }
          });
        };
  
        noBtn.onclick = () => {
          modal.classList.remove("active");
          deleteForm.classList.remove("active");
        };
      };
    });
  }
  
  function render() {
    const contents = JSON.parse(localStorage.getItem(localKey));
  
    console.log(contents);
    for (let i = 0; i < contents.length; i++) {
      let copyofStatus = document
        .querySelector(".main__content-container")
        .cloneNode(true);
      copyofStatus.querySelector(".main__content-status").innerText = contents[i];
      copyofStatus.querySelector(".main__content-delete").classList.add("active");
      mainContent.insertBefore(copyofStatus, mainContent.children[1]);
      console.log(mainContent.children[1]);
    }
    deleteContent(yesBtn, noBtn, deleteForm, modal);
  }
  
  setPost();
  setHeart();
  render();
  