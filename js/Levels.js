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
"#          TT+         #",
"#          BG         <#",
"#>                    ^#",
"#                      #",
"#            f     F   #",
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
"#    h     TT     h    #",
"#  SH hS  >|+v  Sh HS  #",
"#  S H S  ^  <  S H S  #",
"#  Sh HS        SH hS  #",
"#   SSS   H  h   SSS   #",
"# h        HH        h #",
"# c[PPPPPPP  PPPPPPP]c #",
"#  hH Hh Hh Hh Hh Hh   #",
"# c[PPPPPPP  PPPPPPP]c #",
"#   hH Hh Hh Hh Hh Hh  #",
"# c[PPPPPPP  PPPPPPP]c #",
"#  Hh Hh Hh hH Hh Hh   #",
"# c[PPPPPPP  PPPPPPP]c #",
"#   Hh hH Hh Hh Hh Hh  #",
"# c[PPPPPPP  PPPPPPP]c #",
"#H          V         h#",
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
