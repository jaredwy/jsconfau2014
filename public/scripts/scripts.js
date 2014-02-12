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
    var item, span;
    var i = 0;

    for (; i < length; i += 1) {
      item = document.createElement("li");
      item.id = players.lineup[i].handle;
      span = document.createElement("span");
      span.innerHTML = players.lineup[i].name == "unknown" ? "?" : players.lineup[i].name;
      item.appendChild(span);
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
  },
  set: function() {
    this.PLAYERS.players = [].slice.call(document.querySelectorAll('#nav li'));
    this.PLAYERS.count = this.PLAYERS.players.length - 1;// yay zero indexing

    this.PLAYERS.players.forEach(function(member, index){
      member.dataIndex = index;
      member.onmouseover = function() {
        PLYR.ONE = this.dataIndex;
        PLYR.player1();
      };
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
  swap: function() {
    
  },
  update: function() {
		var stats = players.lineup[this.ONE].stats;
		var list = document.createElement('dl');
		var member;
		var type;
		var definition;

    document.querySelector('#player h2').innerHTML = players.lineup[this.ONE].name === 'unknown' ? "?" :  players.lineup[this.ONE].name;
	  document.querySelector('#player figure').style.backgroundImage = "url(data/photos/" + players.lineup[this.ONE].photo + ")";

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
  init: function() {
    this.listen();
    this.create();
    this.set();
    this.update();
  }
}
PLYR.init();