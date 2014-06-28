var enemy = this.getNearestEnemy();
var enemies = this.getEnemies();
var friends = this.getFriends();
var emissles = this.getEnemyMissiles();
var hear = this.hear;



// ===============================
// Calculatino seciton
// -----------

this.makeAbsProps = function (d,s,c) {
    var unit = {};
    unit.dps = d;
    unit.speed = s;
    unit.cost = c;
    return unit;
};


this.soldier       = this.makeAbsProps (5  ,  10 ,      14  );
this.archer        = this.makeAbsProps (17 ,  12 ,      20  );
this.artillery     = this.makeAbsProps (10 ,  8  ,      30  );
this.arrowThrower  = this.makeAbsProps (27 ,  0  ,      1   );
this.munchkin      = this.makeAbsProps (4  ,  12 ,      14  );
this.thrower       = this.makeAbsProps (18 ,  12 ,      20  );
this.shaman        = this.makeAbsProps (7  ,  10 ,      30  );
this.beamTower     = this.makeAbsProps (18 ,  0  ,      1   );    
this.burl          = this.makeAbsProps (100,10,0);






this.getUnitProps = function (unit) {
    var t = unit.type;
    if (t == 'munchkin') { 
        return this.munchkin;
    }
    else if (t == 'thrower') {
        return this.spear; 
    }
    else if (t == 'shaman') { 
        return this.shaman;
    }
    else if (t == 'beam-tower') { 
        return this.beamTower;
    }
    else if (t == 'soldier') { 
        return this.soldier; 
    }
    else if (t == 'archer') { 
        return this.archer;
    }
    else if (t == 'artillery') { 
        return this.artillery; 
    }
    else if (t == 'arrow-tower') { 
        return this.arrowThrower;
    }
    else if (t == 'burl') { 
        return this.burl;
    }
    
    else { 
        return this.makeAbsProps(0,0,0) ;
    }
};



this.totalUnits = function (units) {
    var punit = {};
    punit.health = 0; 
    punit.dps = 0;
    for (var i = 0; i < units.length; ++i ) {
       var tunit = this.getUnitProps(units[i]);  
       if (tunit) {
       punit.health = punit.health + units[i].health; 
       punit.dps    = punit.dps  + tunit.dps;
       }
  
         
    }
   return punit;
};

// onVsOneFunction should determine who would win in a one on one fight between two units.
this.iWin = function (myUnit, targetUnit ) {
 
  var myTurnCount = myUnit.health/targetUnit.dps; 
  var targetTurnCount = (targetUnit.health/myUnit.dps);

  return myTurnCount > targetTurnCount;
};


this.calculateAttack = function (nearEnemy,es,fs) { 
    var fUnit = null;
    var eUnit = null;
    var iwin = null;
    if (fs && es) {
        
        fUnit = this.totalUnits(fs);
        eUnit = this.totalUnits(es);
        iwin = this.iWin(fUnit,eUnit);

    }
    else if (es) { 
        
        fUnit = this.getUnitProps(this);
        eUnit = this.totalUnits(es);
        iwin = this.iWin(fUnit,eUnit);
    }
    if(nearEnemy && iwin ) { 
        this.attack(nearEnemy);
    }
    
    else {
        if (this.buildIndex %2 == 1) {
            this.move({x:67,y:43});
        }
        else {
            this.move({x:43,y:67});
        }
        
    }
    
};


this.getShamanCount = function (friends) {
    var r = 0;
    for (var i = 0; i <friends.length ; i++) {
        if(friends[i].type == 'shaman') {
            r++;
        }
    }
    return r;
};
this.anyShells = function(missles) { 
    var r = false;
    for (var i = 0 ; i < missles.length; ++i) { 
        if (missles[i].type == "shell") {
            return true;
        }
       
    }
    return r;
};
if (this.anyShells(emissles)) { 
    var p = this.pos;

    var o = new Vector();
    o.x = 73;
    o.y = 73;
    o.z = 1;
    
    var d = Vector.subtract(o,p);
    var n = Vector.normalize(d);
    var newVhding = Vector.multiply(n,10);
    var newV = Vector.add(newVhding,p);
    this.say(emissles);
    this.move(newV);
    this.run = true;
}
else {
    if(enemy&&enemies&&friends && !this.run) { 

        this.calculateAttack(enemy,enemies,friends);
    }
    else if (friends) {
         this.run = false;
         var P = this.pos;
         var N = new Vector();
         if(this.buildIndex %2 === 0) {
         N.x = -0.51;
         N.y = 0;
         }
         else { 
         N.x = 0;
         N.y = -0.51;
         }
         var pNew = Vector.add(P,N);
         this.move(pNew);
        

    }
    else { 
        
        this.say("Hold tight");
    }
}


