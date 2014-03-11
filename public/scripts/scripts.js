var PLYR = {
  ONE: 0,
  PLAYERS: {
    players: null,
    count: 0
  },
  create: function() {
    var nav = document.querySelectorAll('#nav ol')[0];
    var temporary = document.createElement("ol");
    var length = players.lineup.length;
    var item, span, anchor;
    var i = 0;
		var enlongen = function(string) {
			var name = string.split(" ");
			var member, temp;

			for (member in name) {
				if (name[member].indexOf("-") < 0 && name[member].length > 7) {
					name[member] = "<b><i>" + name[member].substring(0, 8) + "</i>" + name[member].substring(8) + "</b>";
				} else {
					name[member] = "<s>" + name[member] + "</s>";
				}
			}

			return name.join(" ");
		}

    for (; i < length; i += 1) {
      item = document.createElement("li");
      anchor = document.createElement("a");
      anchor.setAttribute("href", players.lineup[i].twitter);
      item.id = players.lineup[i].handle;
      span = document.createElement("span");
      item.appendChild(anchor);
      span.innerHTML = players.lineup[i].name == "unknown" ? "?" : enlongen(players.lineup[i].name);
      anchor.appendChild(span);
      temporary.appendChild(item);
    }
    nav.innerHTML = temporary.innerHTML;          
    nav.getElementsByTagName("li")[0].className = "current";
  },
  keydown: function(event) {
    var key = event.keyCode;
    var call;
    
    (key === 13 || key === 32) && (PLYR.swap());// ENTER || SPACEBAR
    key === 37 && (PLYR.slide("<", event));// LEFT
    key === 39 && (PLYR.slide(">", event));// RIGHT
  },
  listen: function() {
    document.body.addEventListener("keydown", PLYR.keydown);
  },
  player1: function() {
    this.PLAYERS.players.forEach(function(member){
      member.className = "";
    });

    this.PLAYERS.players[this.ONE].className = "current";
    this.update();
    //this.oneup();
  },
  set: function() {
  	var titles = [].slice.call(document.querySelectorAll('#speaker dt'));
	  var definitions = [].slice.call(document.querySelectorAll('#speaker dd'));
		var tapclick = function() {
			titles[0].className = "";
			titles[1].className = "";
			this.className = "active";

			definitions[0].className = "";
			definitions[1].className = "";
			definitions[this.getAttribute("data-which")].className = "active";
		};

    this.PLAYERS.players = [].slice.call(document.querySelectorAll('#nav li'));
    this.PLAYERS.count = this.PLAYERS.players.length - 1;// yay zero indexing

    this.PLAYERS.players.forEach(function(member, index){
			member.dataIndex = index;
			member.onmouseover = function() {
				PLYR.ONE = this.dataIndex;
				PLYR.player1();
			};
    });

		titles.forEach(function(title, index){
			title.setAttribute("data-which", index)
			title.onclick = tapclick;
			// title.ontap = tapclick;
		});
  },
  slide: function(direction) {
    var one = this.ONE;
    var count = this.PLAYERS.count;

    event.preventDefault();

    if (direction === ">") { one += 1;}
    if (direction === "<") { one -= 1;}

    this.ONE = (one > count) ? 0 : (one < 0) ? count : one;
    this.player1();
  },
  update: function() {
		var stats = players.lineup[this.ONE].stats;
		var list = document.createElement('dl');
		var member;
		var type;
		var definition;

    document.querySelector('#player h2').innerHTML = players.lineup[this.ONE].name === 'unknown' ? "?" :  "<a href="+ players.lineup[this.ONE].twitter  +">"+ players.lineup[this.ONE].name +"</a>";
	  document.querySelector('#player figure').style.backgroundImage = "url(data/photos/" + players.lineup[this.ONE].photo + ")";
    document.querySelector('#player').className = players.lineup[this.ONE].handle;
		if (stats) {
			for (member in players.lineup[this.ONE].stats) {
				type = document.createElement('dt');
				type.innerHTML = member;

				list.appendChild(type);

				definition = document.createElement('dd');
				definition.className = "stars-" + players.lineup[this.ONE].stats[member].toString().replace(/\./, "");

				list.appendChild(definition);
			}			
		}

		document.querySelector('#player dl').innerHTML = list.innerHTML;
  },
	oneup: function() {
		var up = players.lineup[this.ONE]["1up"];
		var bio = players.lineup[this.ONE]["bio"];
		var definitions = document.querySelectorAll('#speaker dd');

		definitions[0].innerHTML = up || "select a player above";
		definitions[1].innerHTML = bio || "select a player above";
	},
	swap: function() {
		
	},
  init: function() {
    this.listen();
    this.create();
    this.set();
    this.update();
   // this.oneup();
  }
}
PLYR.init();