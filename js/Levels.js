var Levels =
{
    Baptism: Baptism,
    Wedding : Wedding,
    Funeral : Funeral,
    PapalConclave: PapalConclave};

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
"#          Qb+  hHhH  h#",
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
    description : "The Prime Minister's baby is the target.  Execute a CODE BROWN and escape before anyone realizes it was you!"
};

var Wedding = {
    map : [
"########################",
"#      g   TT+         #",
"#          BG         <#",
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
    description : "Fart on the bride to taint the marriage."
};

var Funeral = {
    map : [
"########################",
"#          TT          #",
"#          |+          #",
"#                      #",
"#                      #",
"#                      #",
"#  [PPPPPPP  PPPPPPP]  #",
"#                      #",
"#                      #",
"#                      #",
"#  [PPPPPPP  PPPPPPP]  #",
"#                      #",
"#                      #",
"#                      #",
"#  [PPPPPPP  PPPPPPP]  #",
"#                      #",
"#          V           #",
"###########{}###########",
"           II           "],
    description : "Fart in the casket to ruin their afterlife."
};

var PapalConclave = {
    map : [
"########################",
"#c       c TT c       c#",
"#          TT          #",
"#  +++     C      +++  #",
"#                      #",
"#  [PPPPPP]  [PPPPPP]  #",
"#    +           +     #",
"#    +           +     #",
"#      +       +       #",
"#      +       +       #",
"#        +    +        #",
"#        +    +        #",
"#  [PPPPPP]  [PPPPPP]  #",
"#                hH    #",
"#                ++    #",
"#      +               #",
"#c         V          c#",
"###########{}###########",
"           II           "],
    description : "Fart on the Cardinals!"
};

var Levels =
{
    Baptism: Baptism,
    Wedding : Wedding,
    Funeral : Funeral,
    PapalConclave: PapalConclave
};
