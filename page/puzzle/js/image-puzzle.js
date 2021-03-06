var timerFunction;

var imagePuzzle = {
  stepCount: 0,
  startTime: new Date().getTime(),
  startGame: function (images, gridSize) {
    this.setImage(images, gridSize);
    helper.doc("playPanel").style.display = "block";
    helper.shuffle("sortable");
    this.stepCount = 0;
    this.startTime = new Date().getTime();
    this.tick();
  },
  tick: function () {
    var now = new Date().getTime();
    var elapsedTime = parseInt((now - imagePuzzle.startTime) / 1000, 10);
    helper.doc("timerPanel").textContent = elapsedTime;
    timerFunction = setTimeout(imagePuzzle.tick, 1000);
  },
  setImage: function (images, gridSize = 4) {
    var percentage = 100 / (gridSize - 1);
    var image = images[Math.floor(Math.random() * images.length)];
    helper.doc("imgTitle").innerHTML = image.title;
    helper.doc("actualImage").setAttribute("src", image.src);
    helper.doc("sortable").innerHTML = "";

    for (var i = 0; i < gridSize * gridSize; i++) {
      var xpos = percentage * (i % gridSize) + "%";
      var ypos = percentage * Math.floor(i / gridSize) + "%";

      let li = document.createElement("li");
      li.id = i;
      li.setAttribute("data-value", i);
      li.style.backgroundImage = "url(" + image.src + ")";
      li.style.backgroundSize = gridSize * 100 + "%";
      li.style.backgroundPosition = xpos + " " + ypos;
      li.style.border = "1px solid white";
      li.style.width = 560 / gridSize + "px";
      li.style.height = 560 / gridSize + "px";

      li.onclick = (event) => {
        li.style.border = "2px solid white";
        li.style.width = 560 / gridSize - 2 + "px";
        li.style.height = 560 / gridSize - 2 + "px";
        li.style.opacity = 0.3;
        let clickChoose = sessionStorage.getItem("clickChoose");
        if (
          clickChoose == null ||
          clickChoose == "undefined" ||
          clickChoose == "null" ||
          clickChoose == undefined
        ) {
          sessionStorage.setItem("clickChoose", event.target.id);
        } else {
          let origin = helper.doc(clickChoose);
          let dest = helper.doc(event.target.id);
          let p = dest.parentNode;
          sessionStorage.removeItem("clickChoose");
          if (origin && dest && p) {
            let temp = dest.nextSibling;
            let x_diff = origin.offsetLeft - dest.offsetLeft;
            let y_diff = origin.offsetTop - dest.offsetTop;

            if (y_diff == 0 && x_diff > 0) {
              //LEFT SWAP
              p.insertBefore(origin, dest);
              p.insertBefore(temp, origin);
            } else {
              p.insertBefore(dest, origin);
              p.insertBefore(origin, temp);
            }
            let lis = document.getElementsByTagName("li");
            for (let i = 0; i < lis.length; i++) {
              lis[i].style.opacity = 1.0;
            }

            let vals = Array.from(helper.doc("sortable").children).map(
              (x) => x.id
            );
            var now = new Date().getTime();
            helper.doc("stepCount").textContent = ++imagePuzzle.stepCount;
            document.querySelector(".timeCount").textContent = parseInt(
              (now - imagePuzzle.startTime) / 1000,
              10
            );

            if (isSorted(vals)) {
              let lang = sessionStorage.getItem("lang");
              switch (lang) {
                case "zh":
                  document.getElementById("gameover_div").innerHTML= "拼图完成";
                  document.getElementById("gameover").style.display = "block";
                  document.getElementById("gameoverBackground").style.display = "block";
                  break;
                case "en":
                  document.getElementById("gameover_div").innerHTML= "Puzzle completed";
                  document.getElementById("gameover").style.display = "block";
                  document.getElementById("gameoverBackground").style.display = "block";
                  break;
                default:
                  document.getElementById("gameover_div").innerHTML= "拼图完成";
                  document.getElementById("gameover").style.display = "block";
                  document.getElementById("gameoverBackground").style.display = "block";
                  break;
              }
              helper.doc("actualImageBox").innerHTML =
                helper.doc("gameOver").innerHTML;
              helper.doc("stepCount").textContent = imagePuzzle.stepCount;
              let current_image_id = localStorage.getItem("current_image_id");
              let current_task_id = sessionStorage.getItem("current_task_id");
              let image_id =  localStorage.getItem("image_" + current_image_id + "_task_2")
              let missionStart = localStorage.getItem("missionStart");
             if (current_task_id == 2) {
              if (missionStart == "true" && image_id != 3) {
                localStorage.setItem(
                  "image_" + current_image_id + "_task_2",
                  2
                );
              }
             }
            }
          }
        }
      };

      li.setAttribute("draggable", "true");

      li.ondragstart = (event) => {
        console.log("drag start");
        event.dataTransfer.setData("data", event.target.id);
      };
      li.ondragover = (event) => {
        console.log("drag over");
        event.preventDefault();
      };
      li.ondrop = (event) => {
        let origin = helper.doc(event.dataTransfer.getData("data"));
        let dest = helper.doc(event.target.id);
        let p = dest.parentNode;
        console.log(
          "end ondrop=" +
            event.dataTransfer.getData("data") +
            " target_id=" +
            event.target.id
        );
        if (origin && dest && p) {
          let temp = dest.nextSibling;
          let x_diff = origin.offsetLeft - dest.offsetLeft;
          let y_diff = origin.offsetTop - dest.offsetTop;

          if (y_diff == 0 && x_diff > 0) {
            //LEFT SWAP
            p.insertBefore(origin, dest);
            p.insertBefore(temp, origin);
          } else {
            p.insertBefore(dest, origin);
            p.insertBefore(origin, temp);
          }

          let vals = Array.from(helper.doc("sortable").children).map(
            (x) => x.id
          );
          var now = new Date().getTime();
          helper.doc("stepCount").textContent = ++imagePuzzle.stepCount;
          document.querySelector(".timeCount").textContent = parseInt(
            (now - imagePuzzle.startTime) / 1000,
            10
          );

          if (isSorted(vals)) {
            // helper.doc('actualImageBox').style.display = 'none';
            // helper.doc('gameOver').style.display = 'block';
            helper.doc("actualImageBox").innerHTML =
              helper.doc("gameOver").innerHTML;
            helper.doc("stepCount").textContent = imagePuzzle.stepCount;
          }
        }
      };
      li.setAttribute("dragstart", "true");
      li.setAttribute("touchstart", "true");
      helper.doc("sortable").appendChild(li);
    }
    helper.shuffle("sortable");
  },
};

isSorted = (arr) =>
  arr.every((elem, index) => {
    return elem == index;
  });

var helper = {
  doc: (id) => document.getElementById(id) || document.createElement("div"),

  shuffle: (id) => {
    var ul = document.getElementById(id);
    for (var i = ul.children.length; i >= 0; i--) {
      ul.appendChild(ul.children[(Math.random() * i) | 0]);
    }
  },
};
