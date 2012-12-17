// Levels.js

// #### - walls
// [PPPP] - pews
// {} - doors
// <>^v - fans
// V - villain
// b - baby
// B - Bride
// G - groom
// g - grandpa
// S - singer
// + - Priest
// I = Invisible Walls

var Baptism = {
    map :[
"########################",
"#>          v   hHhH   #",
"#          Qb+G hHhH  h#",
"#                      #",
"#   SSSSSS    SSSSSS   #",
"#                      #",
"#  [PPPPPP]  [PPPPPP] H#",
"#                      #",
"#  [PPPPPP]  [PPPPPP]  #",
"#                     <#",
"#^ [PPPPPP]  [PPPPPP]  #",
"#                      #",
"#  [PPPPPP]  [PPPPPP]  #",
"#                      #",
"#  [PPPPPP]  [PPPPPP]  #",
"#                      #",
"#          V           #",
"###########{}###########",
"           II           "],
    description : "The Prime Minister's baby is the target.  Execute CODE BROWN and escape before anyone realizes it was you!"
};

var Wedding = {
    map : [
"########################",
"#      g   TT+        <#",
"#                      #",
"#>                    ^#",
"#                      #",
"#      G     f     F   #",
"#  [PPPPPP]  [PPPPPP]  #",
"#^                    <#",
"#  [PPPPPP]  [PPPPPP]  #",
"#>                    ^#",
"#  [PPPPPP]  [PPPPPP]  #",
"#              e  E    #",
"#  [PPPPPP]  [PPPPPP]  #",
"#^                    <#",
"#  [PPPPPP]  [PPPPPP]  #",
"#                      #",
"#          V           #",
"###########{}###########",
"           II           "],
    description : "Fart on the bride and the groom to taint the marriage!"
};

var Funeral = {
    map : [
"########################",
"#          +           #",
"#                      #",
"#                      #",
"#  [PPPPPPP  PPPPPPP]  #",
"#                      #",
"#  [PPPPPPP  PPPPPPP]  #",
"#                      #",
"#  [PPPPPPP  PPPPPPP]  #",
"#                      #",
"#  [PPPPPPP  PPPPPPP]  #",
"#                      #",
"#  [PPPPPPP  PPPPPPP]  #",
"#                      #",
"#  [PPPPPPP  PPPPPPP]  #",
"#                      #",
"#          V           #",
"###########{}###########",
"           II           "],
    description : "Fart in the casket to ruin his afterlife!"
};

var PapalConclave = {
    map : [
"########################",
"#c       c TT c       c#",
"#          TT          #",
"#          +           #",
"#                      #",
"#                      #",
"#  [PPPPPP]  [PPPPPP]  #",
"#                      #",
"#  [PPPPPP]  [PPPPPP]  #",
"#                      #",
"#  [PPPPPP]  [PPPPPP]  #",
"#                      #",
"#  [PPPPPP]  [PPPPPP]  #",
"#                      #",
"#  [PPPPPP]  [PPPPPP]  #",
"#                      #",
"#c         V          c#",
"###########{}###########",
"           II           "],
    description : "Fart on the Cardinals!"
};

var FartOnJesus = {
    map : [
"########################",
"#c         J          c#",
"#    g                 #",
"#                      #",
"#                      #",
"#    G                 #",
"#  [PPPPPP]F [PPPPPP]  #",
"#           f          #",
"#  [PPPPPP]  [PPPPPP]  #",
"#g       G             #",
"#  [PPPPPP]  [PPPPPP]  #",
"#                      #",
"#  [PPPPPP]  [PPPPPP]  #",
"#                      #",
"#  [PPPPPP]fF[PPPPPP]  #",
"#                      #",
"#c         V          c#",
"###########{}###########",
"           II           "],
    description : "Fart on Jesus!"
};

var Levels =
{
    Baptism: Baptism,
    Wedding : Wedding,
    Funeral : Funeral,
    PapalConclave: PapalConclave};
