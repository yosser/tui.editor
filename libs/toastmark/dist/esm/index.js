/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var encodeCache = {};


// Create a lookup array where anything but characters in `chars` string
// and alphanumeric chars is percent-encoded.
//
function getEncodeCache(exclude) {
  var i, ch, cache = encodeCache[exclude];
  if (cache) { return cache; }

  cache = encodeCache[exclude] = [];

  for (i = 0; i < 128; i++) {
    ch = String.fromCharCode(i);

    if (/^[0-9a-z]$/i.test(ch)) {
      // always allow unencoded alphanumeric characters
      cache.push(ch);
    } else {
      cache.push('%' + ('0' + i.toString(16).toUpperCase()).slice(-2));
    }
  }

  for (i = 0; i < exclude.length; i++) {
    cache[exclude.charCodeAt(i)] = exclude[i];
  }

  return cache;
}


// Encode unsafe characters with percent-encoding, skipping already
// encoded sequences.
//
//  - string       - string to encode
//  - exclude      - list of characters to ignore (in addition to a-zA-Z0-9)
//  - keepEscaped  - don't encode '%' in a correct escape sequence (default: true)
//
function encode$1(string, exclude, keepEscaped) {
  var i, l, code, nextCode, cache,
      result = '';

  if (typeof exclude !== 'string') {
    // encode(string, keepEscaped)
    keepEscaped  = exclude;
    exclude = encode$1.defaultChars;
  }

  if (typeof keepEscaped === 'undefined') {
    keepEscaped = true;
  }

  cache = getEncodeCache(exclude);

  for (i = 0, l = string.length; i < l; i++) {
    code = string.charCodeAt(i);

    if (keepEscaped && code === 0x25 /* % */ && i + 2 < l) {
      if (/^[0-9a-f]{2}$/i.test(string.slice(i + 1, i + 3))) {
        result += string.slice(i, i + 3);
        i += 2;
        continue;
      }
    }

    if (code < 128) {
      result += cache[code];
      continue;
    }

    if (code >= 0xD800 && code <= 0xDFFF) {
      if (code >= 0xD800 && code <= 0xDBFF && i + 1 < l) {
        nextCode = string.charCodeAt(i + 1);
        if (nextCode >= 0xDC00 && nextCode <= 0xDFFF) {
          result += encodeURIComponent(string[i] + string[i + 1]);
          i++;
          continue;
        }
      }
      result += '%EF%BF%BD';
      continue;
    }

    result += encodeURIComponent(string[i]);
  }

  return result;
}

encode$1.defaultChars   = ";/?:@&=+$,-_.!~*'()#";
encode$1.componentChars = "-_.!~*'()";


var encode_1 = encode$1;

var lib = {};

var decode = {};

var Aacute$1 = "Á";
var aacute$1 = "á";
var Abreve = "Ă";
var abreve = "ă";
var ac = "∾";
var acd = "∿";
var acE = "∾̳";
var Acirc$1 = "Â";
var acirc$1 = "â";
var acute$1 = "´";
var Acy = "А";
var acy = "а";
var AElig$1 = "Æ";
var aelig$1 = "æ";
var af = "⁡";
var Afr = "𝔄";
var afr = "𝔞";
var Agrave$1 = "À";
var agrave$1 = "à";
var alefsym = "ℵ";
var aleph = "ℵ";
var Alpha = "Α";
var alpha = "α";
var Amacr = "Ā";
var amacr = "ā";
var amalg = "⨿";
var amp$2 = "&";
var AMP$1 = "&";
var andand = "⩕";
var And = "⩓";
var and = "∧";
var andd = "⩜";
var andslope = "⩘";
var andv = "⩚";
var ang = "∠";
var ange = "⦤";
var angle = "∠";
var angmsdaa = "⦨";
var angmsdab = "⦩";
var angmsdac = "⦪";
var angmsdad = "⦫";
var angmsdae = "⦬";
var angmsdaf = "⦭";
var angmsdag = "⦮";
var angmsdah = "⦯";
var angmsd = "∡";
var angrt = "∟";
var angrtvb = "⊾";
var angrtvbd = "⦝";
var angsph = "∢";
var angst = "Å";
var angzarr = "⍼";
var Aogon = "Ą";
var aogon = "ą";
var Aopf = "𝔸";
var aopf = "𝕒";
var apacir = "⩯";
var ap = "≈";
var apE = "⩰";
var ape = "≊";
var apid = "≋";
var apos$1 = "'";
var ApplyFunction = "⁡";
var approx = "≈";
var approxeq = "≊";
var Aring$1 = "Å";
var aring$1 = "å";
var Ascr = "𝒜";
var ascr = "𝒶";
var Assign = "≔";
var ast = "*";
var asymp = "≈";
var asympeq = "≍";
var Atilde$1 = "Ã";
var atilde$1 = "ã";
var Auml$1 = "Ä";
var auml$1 = "ä";
var awconint = "∳";
var awint = "⨑";
var backcong = "≌";
var backepsilon = "϶";
var backprime = "‵";
var backsim = "∽";
var backsimeq = "⋍";
var Backslash = "∖";
var Barv = "⫧";
var barvee = "⊽";
var barwed = "⌅";
var Barwed = "⌆";
var barwedge = "⌅";
var bbrk = "⎵";
var bbrktbrk = "⎶";
var bcong = "≌";
var Bcy = "Б";
var bcy = "б";
var bdquo = "„";
var becaus = "∵";
var because = "∵";
var Because = "∵";
var bemptyv = "⦰";
var bepsi = "϶";
var bernou = "ℬ";
var Bernoullis = "ℬ";
var Beta = "Β";
var beta = "β";
var beth = "ℶ";
var between = "≬";
var Bfr = "𝔅";
var bfr = "𝔟";
var bigcap = "⋂";
var bigcirc = "◯";
var bigcup = "⋃";
var bigodot = "⨀";
var bigoplus = "⨁";
var bigotimes = "⨂";
var bigsqcup = "⨆";
var bigstar = "★";
var bigtriangledown = "▽";
var bigtriangleup = "△";
var biguplus = "⨄";
var bigvee = "⋁";
var bigwedge = "⋀";
var bkarow = "⤍";
var blacklozenge = "⧫";
var blacksquare = "▪";
var blacktriangle = "▴";
var blacktriangledown = "▾";
var blacktriangleleft = "◂";
var blacktriangleright = "▸";
var blank = "␣";
var blk12 = "▒";
var blk14 = "░";
var blk34 = "▓";
var block = "█";
var bne = "=⃥";
var bnequiv = "≡⃥";
var bNot = "⫭";
var bnot = "⌐";
var Bopf = "𝔹";
var bopf = "𝕓";
var bot = "⊥";
var bottom = "⊥";
var bowtie = "⋈";
var boxbox = "⧉";
var boxdl = "┐";
var boxdL = "╕";
var boxDl = "╖";
var boxDL = "╗";
var boxdr = "┌";
var boxdR = "╒";
var boxDr = "╓";
var boxDR = "╔";
var boxh = "─";
var boxH = "═";
var boxhd = "┬";
var boxHd = "╤";
var boxhD = "╥";
var boxHD = "╦";
var boxhu = "┴";
var boxHu = "╧";
var boxhU = "╨";
var boxHU = "╩";
var boxminus = "⊟";
var boxplus = "⊞";
var boxtimes = "⊠";
var boxul = "┘";
var boxuL = "╛";
var boxUl = "╜";
var boxUL = "╝";
var boxur = "└";
var boxuR = "╘";
var boxUr = "╙";
var boxUR = "╚";
var boxv = "│";
var boxV = "║";
var boxvh = "┼";
var boxvH = "╪";
var boxVh = "╫";
var boxVH = "╬";
var boxvl = "┤";
var boxvL = "╡";
var boxVl = "╢";
var boxVL = "╣";
var boxvr = "├";
var boxvR = "╞";
var boxVr = "╟";
var boxVR = "╠";
var bprime = "‵";
var breve = "˘";
var Breve = "˘";
var brvbar$1 = "¦";
var bscr = "𝒷";
var Bscr = "ℬ";
var bsemi = "⁏";
var bsim = "∽";
var bsime = "⋍";
var bsolb = "⧅";
var bsol = "\\";
var bsolhsub = "⟈";
var bull = "•";
var bullet = "•";
var bump = "≎";
var bumpE = "⪮";
var bumpe = "≏";
var Bumpeq = "≎";
var bumpeq = "≏";
var Cacute = "Ć";
var cacute = "ć";
var capand = "⩄";
var capbrcup = "⩉";
var capcap = "⩋";
var cap = "∩";
var Cap = "⋒";
var capcup = "⩇";
var capdot = "⩀";
var CapitalDifferentialD = "ⅅ";
var caps = "∩︀";
var caret = "⁁";
var caron = "ˇ";
var Cayleys = "ℭ";
var ccaps = "⩍";
var Ccaron = "Č";
var ccaron = "č";
var Ccedil$1 = "Ç";
var ccedil$1 = "ç";
var Ccirc = "Ĉ";
var ccirc = "ĉ";
var Cconint = "∰";
var ccups = "⩌";
var ccupssm = "⩐";
var Cdot = "Ċ";
var cdot = "ċ";
var cedil$1 = "¸";
var Cedilla = "¸";
var cemptyv = "⦲";
var cent$1 = "¢";
var centerdot = "·";
var CenterDot = "·";
var cfr = "𝔠";
var Cfr = "ℭ";
var CHcy = "Ч";
var chcy = "ч";
var check = "✓";
var checkmark = "✓";
var Chi = "Χ";
var chi = "χ";
var circ = "ˆ";
var circeq = "≗";
var circlearrowleft = "↺";
var circlearrowright = "↻";
var circledast = "⊛";
var circledcirc = "⊚";
var circleddash = "⊝";
var CircleDot = "⊙";
var circledR = "®";
var circledS = "Ⓢ";
var CircleMinus = "⊖";
var CirclePlus = "⊕";
var CircleTimes = "⊗";
var cir = "○";
var cirE = "⧃";
var cire = "≗";
var cirfnint = "⨐";
var cirmid = "⫯";
var cirscir = "⧂";
var ClockwiseContourIntegral = "∲";
var CloseCurlyDoubleQuote = "”";
var CloseCurlyQuote = "’";
var clubs = "♣";
var clubsuit = "♣";
var colon = ":";
var Colon = "∷";
var Colone = "⩴";
var colone = "≔";
var coloneq = "≔";
var comma = ",";
var commat = "@";
var comp = "∁";
var compfn = "∘";
var complement = "∁";
var complexes = "ℂ";
var cong = "≅";
var congdot = "⩭";
var Congruent = "≡";
var conint = "∮";
var Conint = "∯";
var ContourIntegral = "∮";
var copf = "𝕔";
var Copf = "ℂ";
var coprod = "∐";
var Coproduct = "∐";
var copy$1 = "©";
var COPY$1 = "©";
var copysr = "℗";
var CounterClockwiseContourIntegral = "∳";
var crarr = "↵";
var cross = "✗";
var Cross = "⨯";
var Cscr = "𝒞";
var cscr = "𝒸";
var csub = "⫏";
var csube = "⫑";
var csup = "⫐";
var csupe = "⫒";
var ctdot = "⋯";
var cudarrl = "⤸";
var cudarrr = "⤵";
var cuepr = "⋞";
var cuesc = "⋟";
var cularr = "↶";
var cularrp = "⤽";
var cupbrcap = "⩈";
var cupcap = "⩆";
var CupCap = "≍";
var cup = "∪";
var Cup = "⋓";
var cupcup = "⩊";
var cupdot = "⊍";
var cupor = "⩅";
var cups = "∪︀";
var curarr = "↷";
var curarrm = "⤼";
var curlyeqprec = "⋞";
var curlyeqsucc = "⋟";
var curlyvee = "⋎";
var curlywedge = "⋏";
var curren$1 = "¤";
var curvearrowleft = "↶";
var curvearrowright = "↷";
var cuvee = "⋎";
var cuwed = "⋏";
var cwconint = "∲";
var cwint = "∱";
var cylcty = "⌭";
var dagger = "†";
var Dagger = "‡";
var daleth = "ℸ";
var darr = "↓";
var Darr = "↡";
var dArr = "⇓";
var dash = "‐";
var Dashv = "⫤";
var dashv = "⊣";
var dbkarow = "⤏";
var dblac = "˝";
var Dcaron = "Ď";
var dcaron = "ď";
var Dcy = "Д";
var dcy = "д";
var ddagger = "‡";
var ddarr = "⇊";
var DD = "ⅅ";
var dd = "ⅆ";
var DDotrahd = "⤑";
var ddotseq = "⩷";
var deg$1 = "°";
var Del = "∇";
var Delta = "Δ";
var delta = "δ";
var demptyv = "⦱";
var dfisht = "⥿";
var Dfr = "𝔇";
var dfr = "𝔡";
var dHar = "⥥";
var dharl = "⇃";
var dharr = "⇂";
var DiacriticalAcute = "´";
var DiacriticalDot = "˙";
var DiacriticalDoubleAcute = "˝";
var DiacriticalGrave = "`";
var DiacriticalTilde = "˜";
var diam = "⋄";
var diamond = "⋄";
var Diamond = "⋄";
var diamondsuit = "♦";
var diams = "♦";
var die = "¨";
var DifferentialD = "ⅆ";
var digamma = "ϝ";
var disin = "⋲";
var div = "÷";
var divide$1 = "÷";
var divideontimes = "⋇";
var divonx = "⋇";
var DJcy = "Ђ";
var djcy = "ђ";
var dlcorn = "⌞";
var dlcrop = "⌍";
var dollar = "$";
var Dopf = "𝔻";
var dopf = "𝕕";
var Dot = "¨";
var dot = "˙";
var DotDot = "⃜";
var doteq = "≐";
var doteqdot = "≑";
var DotEqual = "≐";
var dotminus = "∸";
var dotplus = "∔";
var dotsquare = "⊡";
var doublebarwedge = "⌆";
var DoubleContourIntegral = "∯";
var DoubleDot = "¨";
var DoubleDownArrow = "⇓";
var DoubleLeftArrow = "⇐";
var DoubleLeftRightArrow = "⇔";
var DoubleLeftTee = "⫤";
var DoubleLongLeftArrow = "⟸";
var DoubleLongLeftRightArrow = "⟺";
var DoubleLongRightArrow = "⟹";
var DoubleRightArrow = "⇒";
var DoubleRightTee = "⊨";
var DoubleUpArrow = "⇑";
var DoubleUpDownArrow = "⇕";
var DoubleVerticalBar = "∥";
var DownArrowBar = "⤓";
var downarrow = "↓";
var DownArrow = "↓";
var Downarrow = "⇓";
var DownArrowUpArrow = "⇵";
var DownBreve = "̑";
var downdownarrows = "⇊";
var downharpoonleft = "⇃";
var downharpoonright = "⇂";
var DownLeftRightVector = "⥐";
var DownLeftTeeVector = "⥞";
var DownLeftVectorBar = "⥖";
var DownLeftVector = "↽";
var DownRightTeeVector = "⥟";
var DownRightVectorBar = "⥗";
var DownRightVector = "⇁";
var DownTeeArrow = "↧";
var DownTee = "⊤";
var drbkarow = "⤐";
var drcorn = "⌟";
var drcrop = "⌌";
var Dscr = "𝒟";
var dscr = "𝒹";
var DScy = "Ѕ";
var dscy = "ѕ";
var dsol = "⧶";
var Dstrok = "Đ";
var dstrok = "đ";
var dtdot = "⋱";
var dtri = "▿";
var dtrif = "▾";
var duarr = "⇵";
var duhar = "⥯";
var dwangle = "⦦";
var DZcy = "Џ";
var dzcy = "џ";
var dzigrarr = "⟿";
var Eacute$1 = "É";
var eacute$1 = "é";
var easter = "⩮";
var Ecaron = "Ě";
var ecaron = "ě";
var Ecirc$1 = "Ê";
var ecirc$1 = "ê";
var ecir = "≖";
var ecolon = "≕";
var Ecy = "Э";
var ecy = "э";
var eDDot = "⩷";
var Edot = "Ė";
var edot = "ė";
var eDot = "≑";
var ee = "ⅇ";
var efDot = "≒";
var Efr = "𝔈";
var efr = "𝔢";
var eg = "⪚";
var Egrave$1 = "È";
var egrave$1 = "è";
var egs = "⪖";
var egsdot = "⪘";
var el = "⪙";
var Element = "∈";
var elinters = "⏧";
var ell = "ℓ";
var els = "⪕";
var elsdot = "⪗";
var Emacr = "Ē";
var emacr = "ē";
var empty = "∅";
var emptyset = "∅";
var EmptySmallSquare = "◻";
var emptyv = "∅";
var EmptyVerySmallSquare = "▫";
var emsp13 = " ";
var emsp14 = " ";
var emsp = " ";
var ENG = "Ŋ";
var eng = "ŋ";
var ensp = " ";
var Eogon = "Ę";
var eogon = "ę";
var Eopf = "𝔼";
var eopf = "𝕖";
var epar = "⋕";
var eparsl = "⧣";
var eplus = "⩱";
var epsi = "ε";
var Epsilon = "Ε";
var epsilon = "ε";
var epsiv = "ϵ";
var eqcirc = "≖";
var eqcolon = "≕";
var eqsim = "≂";
var eqslantgtr = "⪖";
var eqslantless = "⪕";
var Equal = "⩵";
var equals = "=";
var EqualTilde = "≂";
var equest = "≟";
var Equilibrium = "⇌";
var equiv = "≡";
var equivDD = "⩸";
var eqvparsl = "⧥";
var erarr = "⥱";
var erDot = "≓";
var escr = "ℯ";
var Escr = "ℰ";
var esdot = "≐";
var Esim = "⩳";
var esim = "≂";
var Eta = "Η";
var eta = "η";
var ETH$1 = "Ð";
var eth$1 = "ð";
var Euml$1 = "Ë";
var euml$1 = "ë";
var euro = "€";
var excl = "!";
var exist = "∃";
var Exists = "∃";
var expectation = "ℰ";
var exponentiale = "ⅇ";
var ExponentialE = "ⅇ";
var fallingdotseq = "≒";
var Fcy = "Ф";
var fcy = "ф";
var female = "♀";
var ffilig = "ﬃ";
var fflig = "ﬀ";
var ffllig = "ﬄ";
var Ffr = "𝔉";
var ffr = "𝔣";
var filig = "ﬁ";
var FilledSmallSquare = "◼";
var FilledVerySmallSquare = "▪";
var fjlig = "fj";
var flat = "♭";
var fllig = "ﬂ";
var fltns = "▱";
var fnof = "ƒ";
var Fopf = "𝔽";
var fopf = "𝕗";
var forall = "∀";
var ForAll = "∀";
var fork = "⋔";
var forkv = "⫙";
var Fouriertrf = "ℱ";
var fpartint = "⨍";
var frac12$1 = "½";
var frac13 = "⅓";
var frac14$1 = "¼";
var frac15 = "⅕";
var frac16 = "⅙";
var frac18 = "⅛";
var frac23 = "⅔";
var frac25 = "⅖";
var frac34$1 = "¾";
var frac35 = "⅗";
var frac38 = "⅜";
var frac45 = "⅘";
var frac56 = "⅚";
var frac58 = "⅝";
var frac78 = "⅞";
var frasl = "⁄";
var frown = "⌢";
var fscr = "𝒻";
var Fscr = "ℱ";
var gacute = "ǵ";
var Gamma = "Γ";
var gamma = "γ";
var Gammad = "Ϝ";
var gammad = "ϝ";
var gap = "⪆";
var Gbreve = "Ğ";
var gbreve = "ğ";
var Gcedil = "Ģ";
var Gcirc = "Ĝ";
var gcirc = "ĝ";
var Gcy = "Г";
var gcy = "г";
var Gdot = "Ġ";
var gdot = "ġ";
var ge = "≥";
var gE = "≧";
var gEl = "⪌";
var gel = "⋛";
var geq = "≥";
var geqq = "≧";
var geqslant = "⩾";
var gescc = "⪩";
var ges = "⩾";
var gesdot = "⪀";
var gesdoto = "⪂";
var gesdotol = "⪄";
var gesl = "⋛︀";
var gesles = "⪔";
var Gfr = "𝔊";
var gfr = "𝔤";
var gg = "≫";
var Gg = "⋙";
var ggg = "⋙";
var gimel = "ℷ";
var GJcy = "Ѓ";
var gjcy = "ѓ";
var gla = "⪥";
var gl = "≷";
var glE = "⪒";
var glj = "⪤";
var gnap = "⪊";
var gnapprox = "⪊";
var gne = "⪈";
var gnE = "≩";
var gneq = "⪈";
var gneqq = "≩";
var gnsim = "⋧";
var Gopf = "𝔾";
var gopf = "𝕘";
var grave = "`";
var GreaterEqual = "≥";
var GreaterEqualLess = "⋛";
var GreaterFullEqual = "≧";
var GreaterGreater = "⪢";
var GreaterLess = "≷";
var GreaterSlantEqual = "⩾";
var GreaterTilde = "≳";
var Gscr = "𝒢";
var gscr = "ℊ";
var gsim = "≳";
var gsime = "⪎";
var gsiml = "⪐";
var gtcc = "⪧";
var gtcir = "⩺";
var gt$2 = ">";
var GT$1 = ">";
var Gt = "≫";
var gtdot = "⋗";
var gtlPar = "⦕";
var gtquest = "⩼";
var gtrapprox = "⪆";
var gtrarr = "⥸";
var gtrdot = "⋗";
var gtreqless = "⋛";
var gtreqqless = "⪌";
var gtrless = "≷";
var gtrsim = "≳";
var gvertneqq = "≩︀";
var gvnE = "≩︀";
var Hacek = "ˇ";
var hairsp = " ";
var half = "½";
var hamilt = "ℋ";
var HARDcy = "Ъ";
var hardcy = "ъ";
var harrcir = "⥈";
var harr = "↔";
var hArr = "⇔";
var harrw = "↭";
var Hat = "^";
var hbar = "ℏ";
var Hcirc = "Ĥ";
var hcirc = "ĥ";
var hearts = "♥";
var heartsuit = "♥";
var hellip = "…";
var hercon = "⊹";
var hfr = "𝔥";
var Hfr = "ℌ";
var HilbertSpace = "ℋ";
var hksearow = "⤥";
var hkswarow = "⤦";
var hoarr = "⇿";
var homtht = "∻";
var hookleftarrow = "↩";
var hookrightarrow = "↪";
var hopf = "𝕙";
var Hopf = "ℍ";
var horbar = "―";
var HorizontalLine = "─";
var hscr = "𝒽";
var Hscr = "ℋ";
var hslash = "ℏ";
var Hstrok = "Ħ";
var hstrok = "ħ";
var HumpDownHump = "≎";
var HumpEqual = "≏";
var hybull = "⁃";
var hyphen = "‐";
var Iacute$1 = "Í";
var iacute$1 = "í";
var ic = "⁣";
var Icirc$1 = "Î";
var icirc$1 = "î";
var Icy = "И";
var icy = "и";
var Idot = "İ";
var IEcy = "Е";
var iecy = "е";
var iexcl$1 = "¡";
var iff = "⇔";
var ifr = "𝔦";
var Ifr = "ℑ";
var Igrave$1 = "Ì";
var igrave$1 = "ì";
var ii = "ⅈ";
var iiiint = "⨌";
var iiint = "∭";
var iinfin = "⧜";
var iiota = "℩";
var IJlig = "Ĳ";
var ijlig = "ĳ";
var Imacr = "Ī";
var imacr = "ī";
var image = "ℑ";
var ImaginaryI = "ⅈ";
var imagline = "ℐ";
var imagpart = "ℑ";
var imath = "ı";
var Im = "ℑ";
var imof = "⊷";
var imped = "Ƶ";
var Implies = "⇒";
var incare = "℅";
var infin = "∞";
var infintie = "⧝";
var inodot = "ı";
var intcal = "⊺";
var int = "∫";
var Int = "∬";
var integers = "ℤ";
var Integral = "∫";
var intercal = "⊺";
var Intersection = "⋂";
var intlarhk = "⨗";
var intprod = "⨼";
var InvisibleComma = "⁣";
var InvisibleTimes = "⁢";
var IOcy = "Ё";
var iocy = "ё";
var Iogon = "Į";
var iogon = "į";
var Iopf = "𝕀";
var iopf = "𝕚";
var Iota = "Ι";
var iota = "ι";
var iprod = "⨼";
var iquest$1 = "¿";
var iscr = "𝒾";
var Iscr = "ℐ";
var isin = "∈";
var isindot = "⋵";
var isinE = "⋹";
var isins = "⋴";
var isinsv = "⋳";
var isinv = "∈";
var it = "⁢";
var Itilde = "Ĩ";
var itilde = "ĩ";
var Iukcy = "І";
var iukcy = "і";
var Iuml$1 = "Ï";
var iuml$1 = "ï";
var Jcirc = "Ĵ";
var jcirc = "ĵ";
var Jcy = "Й";
var jcy = "й";
var Jfr = "𝔍";
var jfr = "𝔧";
var jmath = "ȷ";
var Jopf = "𝕁";
var jopf = "𝕛";
var Jscr = "𝒥";
var jscr = "𝒿";
var Jsercy = "Ј";
var jsercy = "ј";
var Jukcy = "Є";
var jukcy = "є";
var Kappa = "Κ";
var kappa = "κ";
var kappav = "ϰ";
var Kcedil = "Ķ";
var kcedil = "ķ";
var Kcy = "К";
var kcy = "к";
var Kfr = "𝔎";
var kfr = "𝔨";
var kgreen = "ĸ";
var KHcy = "Х";
var khcy = "х";
var KJcy = "Ќ";
var kjcy = "ќ";
var Kopf = "𝕂";
var kopf = "𝕜";
var Kscr = "𝒦";
var kscr = "𝓀";
var lAarr = "⇚";
var Lacute = "Ĺ";
var lacute = "ĺ";
var laemptyv = "⦴";
var lagran = "ℒ";
var Lambda = "Λ";
var lambda = "λ";
var lang = "⟨";
var Lang = "⟪";
var langd = "⦑";
var langle = "⟨";
var lap = "⪅";
var Laplacetrf = "ℒ";
var laquo$1 = "«";
var larrb = "⇤";
var larrbfs = "⤟";
var larr = "←";
var Larr = "↞";
var lArr = "⇐";
var larrfs = "⤝";
var larrhk = "↩";
var larrlp = "↫";
var larrpl = "⤹";
var larrsim = "⥳";
var larrtl = "↢";
var latail = "⤙";
var lAtail = "⤛";
var lat = "⪫";
var late = "⪭";
var lates = "⪭︀";
var lbarr = "⤌";
var lBarr = "⤎";
var lbbrk = "❲";
var lbrace = "{";
var lbrack = "[";
var lbrke = "⦋";
var lbrksld = "⦏";
var lbrkslu = "⦍";
var Lcaron = "Ľ";
var lcaron = "ľ";
var Lcedil = "Ļ";
var lcedil = "ļ";
var lceil = "⌈";
var lcub = "{";
var Lcy = "Л";
var lcy = "л";
var ldca = "⤶";
var ldquo = "“";
var ldquor = "„";
var ldrdhar = "⥧";
var ldrushar = "⥋";
var ldsh = "↲";
var le = "≤";
var lE = "≦";
var LeftAngleBracket = "⟨";
var LeftArrowBar = "⇤";
var leftarrow = "←";
var LeftArrow = "←";
var Leftarrow = "⇐";
var LeftArrowRightArrow = "⇆";
var leftarrowtail = "↢";
var LeftCeiling = "⌈";
var LeftDoubleBracket = "⟦";
var LeftDownTeeVector = "⥡";
var LeftDownVectorBar = "⥙";
var LeftDownVector = "⇃";
var LeftFloor = "⌊";
var leftharpoondown = "↽";
var leftharpoonup = "↼";
var leftleftarrows = "⇇";
var leftrightarrow = "↔";
var LeftRightArrow = "↔";
var Leftrightarrow = "⇔";
var leftrightarrows = "⇆";
var leftrightharpoons = "⇋";
var leftrightsquigarrow = "↭";
var LeftRightVector = "⥎";
var LeftTeeArrow = "↤";
var LeftTee = "⊣";
var LeftTeeVector = "⥚";
var leftthreetimes = "⋋";
var LeftTriangleBar = "⧏";
var LeftTriangle = "⊲";
var LeftTriangleEqual = "⊴";
var LeftUpDownVector = "⥑";
var LeftUpTeeVector = "⥠";
var LeftUpVectorBar = "⥘";
var LeftUpVector = "↿";
var LeftVectorBar = "⥒";
var LeftVector = "↼";
var lEg = "⪋";
var leg = "⋚";
var leq = "≤";
var leqq = "≦";
var leqslant = "⩽";
var lescc = "⪨";
var les = "⩽";
var lesdot = "⩿";
var lesdoto = "⪁";
var lesdotor = "⪃";
var lesg = "⋚︀";
var lesges = "⪓";
var lessapprox = "⪅";
var lessdot = "⋖";
var lesseqgtr = "⋚";
var lesseqqgtr = "⪋";
var LessEqualGreater = "⋚";
var LessFullEqual = "≦";
var LessGreater = "≶";
var lessgtr = "≶";
var LessLess = "⪡";
var lesssim = "≲";
var LessSlantEqual = "⩽";
var LessTilde = "≲";
var lfisht = "⥼";
var lfloor = "⌊";
var Lfr = "𝔏";
var lfr = "𝔩";
var lg = "≶";
var lgE = "⪑";
var lHar = "⥢";
var lhard = "↽";
var lharu = "↼";
var lharul = "⥪";
var lhblk = "▄";
var LJcy = "Љ";
var ljcy = "љ";
var llarr = "⇇";
var ll = "≪";
var Ll = "⋘";
var llcorner = "⌞";
var Lleftarrow = "⇚";
var llhard = "⥫";
var lltri = "◺";
var Lmidot = "Ŀ";
var lmidot = "ŀ";
var lmoustache = "⎰";
var lmoust = "⎰";
var lnap = "⪉";
var lnapprox = "⪉";
var lne = "⪇";
var lnE = "≨";
var lneq = "⪇";
var lneqq = "≨";
var lnsim = "⋦";
var loang = "⟬";
var loarr = "⇽";
var lobrk = "⟦";
var longleftarrow = "⟵";
var LongLeftArrow = "⟵";
var Longleftarrow = "⟸";
var longleftrightarrow = "⟷";
var LongLeftRightArrow = "⟷";
var Longleftrightarrow = "⟺";
var longmapsto = "⟼";
var longrightarrow = "⟶";
var LongRightArrow = "⟶";
var Longrightarrow = "⟹";
var looparrowleft = "↫";
var looparrowright = "↬";
var lopar = "⦅";
var Lopf = "𝕃";
var lopf = "𝕝";
var loplus = "⨭";
var lotimes = "⨴";
var lowast = "∗";
var lowbar = "_";
var LowerLeftArrow = "↙";
var LowerRightArrow = "↘";
var loz = "◊";
var lozenge = "◊";
var lozf = "⧫";
var lpar = "(";
var lparlt = "⦓";
var lrarr = "⇆";
var lrcorner = "⌟";
var lrhar = "⇋";
var lrhard = "⥭";
var lrm = "‎";
var lrtri = "⊿";
var lsaquo = "‹";
var lscr = "𝓁";
var Lscr = "ℒ";
var lsh = "↰";
var Lsh = "↰";
var lsim = "≲";
var lsime = "⪍";
var lsimg = "⪏";
var lsqb = "[";
var lsquo = "‘";
var lsquor = "‚";
var Lstrok = "Ł";
var lstrok = "ł";
var ltcc = "⪦";
var ltcir = "⩹";
var lt$2 = "<";
var LT$1 = "<";
var Lt = "≪";
var ltdot = "⋖";
var lthree = "⋋";
var ltimes = "⋉";
var ltlarr = "⥶";
var ltquest = "⩻";
var ltri = "◃";
var ltrie = "⊴";
var ltrif = "◂";
var ltrPar = "⦖";
var lurdshar = "⥊";
var luruhar = "⥦";
var lvertneqq = "≨︀";
var lvnE = "≨︀";
var macr$1 = "¯";
var male = "♂";
var malt = "✠";
var maltese = "✠";
var map = "↦";
var mapsto = "↦";
var mapstodown = "↧";
var mapstoleft = "↤";
var mapstoup = "↥";
var marker = "▮";
var mcomma = "⨩";
var Mcy = "М";
var mcy = "м";
var mdash = "—";
var mDDot = "∺";
var measuredangle = "∡";
var MediumSpace = " ";
var Mellintrf = "ℳ";
var Mfr = "𝔐";
var mfr = "𝔪";
var mho = "℧";
var micro$1 = "µ";
var midast = "*";
var midcir = "⫰";
var mid = "∣";
var middot$1 = "·";
var minusb = "⊟";
var minus = "−";
var minusd = "∸";
var minusdu = "⨪";
var MinusPlus = "∓";
var mlcp = "⫛";
var mldr = "…";
var mnplus = "∓";
var models = "⊧";
var Mopf = "𝕄";
var mopf = "𝕞";
var mp = "∓";
var mscr = "𝓂";
var Mscr = "ℳ";
var mstpos = "∾";
var Mu = "Μ";
var mu = "μ";
var multimap = "⊸";
var mumap = "⊸";
var nabla = "∇";
var Nacute = "Ń";
var nacute = "ń";
var nang = "∠⃒";
var nap = "≉";
var napE = "⩰̸";
var napid = "≋̸";
var napos = "ŉ";
var napprox = "≉";
var natural = "♮";
var naturals = "ℕ";
var natur = "♮";
var nbsp$1 = " ";
var nbump = "≎̸";
var nbumpe = "≏̸";
var ncap = "⩃";
var Ncaron = "Ň";
var ncaron = "ň";
var Ncedil = "Ņ";
var ncedil = "ņ";
var ncong = "≇";
var ncongdot = "⩭̸";
var ncup = "⩂";
var Ncy = "Н";
var ncy = "н";
var ndash = "–";
var nearhk = "⤤";
var nearr = "↗";
var neArr = "⇗";
var nearrow = "↗";
var ne = "≠";
var nedot = "≐̸";
var NegativeMediumSpace = "​";
var NegativeThickSpace = "​";
var NegativeThinSpace = "​";
var NegativeVeryThinSpace = "​";
var nequiv = "≢";
var nesear = "⤨";
var nesim = "≂̸";
var NestedGreaterGreater = "≫";
var NestedLessLess = "≪";
var NewLine = "\n";
var nexist = "∄";
var nexists = "∄";
var Nfr = "𝔑";
var nfr = "𝔫";
var ngE = "≧̸";
var nge = "≱";
var ngeq = "≱";
var ngeqq = "≧̸";
var ngeqslant = "⩾̸";
var nges = "⩾̸";
var nGg = "⋙̸";
var ngsim = "≵";
var nGt = "≫⃒";
var ngt = "≯";
var ngtr = "≯";
var nGtv = "≫̸";
var nharr = "↮";
var nhArr = "⇎";
var nhpar = "⫲";
var ni = "∋";
var nis = "⋼";
var nisd = "⋺";
var niv = "∋";
var NJcy = "Њ";
var njcy = "њ";
var nlarr = "↚";
var nlArr = "⇍";
var nldr = "‥";
var nlE = "≦̸";
var nle = "≰";
var nleftarrow = "↚";
var nLeftarrow = "⇍";
var nleftrightarrow = "↮";
var nLeftrightarrow = "⇎";
var nleq = "≰";
var nleqq = "≦̸";
var nleqslant = "⩽̸";
var nles = "⩽̸";
var nless = "≮";
var nLl = "⋘̸";
var nlsim = "≴";
var nLt = "≪⃒";
var nlt = "≮";
var nltri = "⋪";
var nltrie = "⋬";
var nLtv = "≪̸";
var nmid = "∤";
var NoBreak = "⁠";
var NonBreakingSpace = " ";
var nopf = "𝕟";
var Nopf = "ℕ";
var Not = "⫬";
var not$1 = "¬";
var NotCongruent = "≢";
var NotCupCap = "≭";
var NotDoubleVerticalBar = "∦";
var NotElement = "∉";
var NotEqual = "≠";
var NotEqualTilde = "≂̸";
var NotExists = "∄";
var NotGreater = "≯";
var NotGreaterEqual = "≱";
var NotGreaterFullEqual = "≧̸";
var NotGreaterGreater = "≫̸";
var NotGreaterLess = "≹";
var NotGreaterSlantEqual = "⩾̸";
var NotGreaterTilde = "≵";
var NotHumpDownHump = "≎̸";
var NotHumpEqual = "≏̸";
var notin = "∉";
var notindot = "⋵̸";
var notinE = "⋹̸";
var notinva = "∉";
var notinvb = "⋷";
var notinvc = "⋶";
var NotLeftTriangleBar = "⧏̸";
var NotLeftTriangle = "⋪";
var NotLeftTriangleEqual = "⋬";
var NotLess = "≮";
var NotLessEqual = "≰";
var NotLessGreater = "≸";
var NotLessLess = "≪̸";
var NotLessSlantEqual = "⩽̸";
var NotLessTilde = "≴";
var NotNestedGreaterGreater = "⪢̸";
var NotNestedLessLess = "⪡̸";
var notni = "∌";
var notniva = "∌";
var notnivb = "⋾";
var notnivc = "⋽";
var NotPrecedes = "⊀";
var NotPrecedesEqual = "⪯̸";
var NotPrecedesSlantEqual = "⋠";
var NotReverseElement = "∌";
var NotRightTriangleBar = "⧐̸";
var NotRightTriangle = "⋫";
var NotRightTriangleEqual = "⋭";
var NotSquareSubset = "⊏̸";
var NotSquareSubsetEqual = "⋢";
var NotSquareSuperset = "⊐̸";
var NotSquareSupersetEqual = "⋣";
var NotSubset = "⊂⃒";
var NotSubsetEqual = "⊈";
var NotSucceeds = "⊁";
var NotSucceedsEqual = "⪰̸";
var NotSucceedsSlantEqual = "⋡";
var NotSucceedsTilde = "≿̸";
var NotSuperset = "⊃⃒";
var NotSupersetEqual = "⊉";
var NotTilde = "≁";
var NotTildeEqual = "≄";
var NotTildeFullEqual = "≇";
var NotTildeTilde = "≉";
var NotVerticalBar = "∤";
var nparallel = "∦";
var npar = "∦";
var nparsl = "⫽⃥";
var npart = "∂̸";
var npolint = "⨔";
var npr = "⊀";
var nprcue = "⋠";
var nprec = "⊀";
var npreceq = "⪯̸";
var npre = "⪯̸";
var nrarrc = "⤳̸";
var nrarr = "↛";
var nrArr = "⇏";
var nrarrw = "↝̸";
var nrightarrow = "↛";
var nRightarrow = "⇏";
var nrtri = "⋫";
var nrtrie = "⋭";
var nsc = "⊁";
var nsccue = "⋡";
var nsce = "⪰̸";
var Nscr = "𝒩";
var nscr = "𝓃";
var nshortmid = "∤";
var nshortparallel = "∦";
var nsim = "≁";
var nsime = "≄";
var nsimeq = "≄";
var nsmid = "∤";
var nspar = "∦";
var nsqsube = "⋢";
var nsqsupe = "⋣";
var nsub = "⊄";
var nsubE = "⫅̸";
var nsube = "⊈";
var nsubset = "⊂⃒";
var nsubseteq = "⊈";
var nsubseteqq = "⫅̸";
var nsucc = "⊁";
var nsucceq = "⪰̸";
var nsup = "⊅";
var nsupE = "⫆̸";
var nsupe = "⊉";
var nsupset = "⊃⃒";
var nsupseteq = "⊉";
var nsupseteqq = "⫆̸";
var ntgl = "≹";
var Ntilde$1 = "Ñ";
var ntilde$1 = "ñ";
var ntlg = "≸";
var ntriangleleft = "⋪";
var ntrianglelefteq = "⋬";
var ntriangleright = "⋫";
var ntrianglerighteq = "⋭";
var Nu = "Ν";
var nu = "ν";
var num = "#";
var numero = "№";
var numsp = " ";
var nvap = "≍⃒";
var nvdash = "⊬";
var nvDash = "⊭";
var nVdash = "⊮";
var nVDash = "⊯";
var nvge = "≥⃒";
var nvgt = ">⃒";
var nvHarr = "⤄";
var nvinfin = "⧞";
var nvlArr = "⤂";
var nvle = "≤⃒";
var nvlt = "<⃒";
var nvltrie = "⊴⃒";
var nvrArr = "⤃";
var nvrtrie = "⊵⃒";
var nvsim = "∼⃒";
var nwarhk = "⤣";
var nwarr = "↖";
var nwArr = "⇖";
var nwarrow = "↖";
var nwnear = "⤧";
var Oacute$1 = "Ó";
var oacute$1 = "ó";
var oast = "⊛";
var Ocirc$1 = "Ô";
var ocirc$1 = "ô";
var ocir = "⊚";
var Ocy = "О";
var ocy = "о";
var odash = "⊝";
var Odblac = "Ő";
var odblac = "ő";
var odiv = "⨸";
var odot = "⊙";
var odsold = "⦼";
var OElig = "Œ";
var oelig = "œ";
var ofcir = "⦿";
var Ofr = "𝔒";
var ofr = "𝔬";
var ogon = "˛";
var Ograve$1 = "Ò";
var ograve$1 = "ò";
var ogt = "⧁";
var ohbar = "⦵";
var ohm = "Ω";
var oint = "∮";
var olarr = "↺";
var olcir = "⦾";
var olcross = "⦻";
var oline = "‾";
var olt = "⧀";
var Omacr = "Ō";
var omacr = "ō";
var Omega = "Ω";
var omega = "ω";
var Omicron = "Ο";
var omicron = "ο";
var omid = "⦶";
var ominus = "⊖";
var Oopf = "𝕆";
var oopf = "𝕠";
var opar = "⦷";
var OpenCurlyDoubleQuote = "“";
var OpenCurlyQuote = "‘";
var operp = "⦹";
var oplus = "⊕";
var orarr = "↻";
var Or = "⩔";
var or = "∨";
var ord = "⩝";
var order = "ℴ";
var orderof = "ℴ";
var ordf$1 = "ª";
var ordm$1 = "º";
var origof = "⊶";
var oror = "⩖";
var orslope = "⩗";
var orv = "⩛";
var oS = "Ⓢ";
var Oscr = "𝒪";
var oscr = "ℴ";
var Oslash$1 = "Ø";
var oslash$1 = "ø";
var osol = "⊘";
var Otilde$1 = "Õ";
var otilde$1 = "õ";
var otimesas = "⨶";
var Otimes = "⨷";
var otimes = "⊗";
var Ouml$1 = "Ö";
var ouml$1 = "ö";
var ovbar = "⌽";
var OverBar = "‾";
var OverBrace = "⏞";
var OverBracket = "⎴";
var OverParenthesis = "⏜";
var para$1 = "¶";
var parallel = "∥";
var par = "∥";
var parsim = "⫳";
var parsl = "⫽";
var part = "∂";
var PartialD = "∂";
var Pcy = "П";
var pcy = "п";
var percnt = "%";
var period = ".";
var permil = "‰";
var perp = "⊥";
var pertenk = "‱";
var Pfr = "𝔓";
var pfr = "𝔭";
var Phi = "Φ";
var phi = "φ";
var phiv = "ϕ";
var phmmat = "ℳ";
var phone = "☎";
var Pi = "Π";
var pi = "π";
var pitchfork = "⋔";
var piv = "ϖ";
var planck = "ℏ";
var planckh = "ℎ";
var plankv = "ℏ";
var plusacir = "⨣";
var plusb = "⊞";
var pluscir = "⨢";
var plus = "+";
var plusdo = "∔";
var plusdu = "⨥";
var pluse = "⩲";
var PlusMinus = "±";
var plusmn$1 = "±";
var plussim = "⨦";
var plustwo = "⨧";
var pm = "±";
var Poincareplane = "ℌ";
var pointint = "⨕";
var popf = "𝕡";
var Popf = "ℙ";
var pound$1 = "£";
var prap = "⪷";
var Pr = "⪻";
var pr = "≺";
var prcue = "≼";
var precapprox = "⪷";
var prec = "≺";
var preccurlyeq = "≼";
var Precedes = "≺";
var PrecedesEqual = "⪯";
var PrecedesSlantEqual = "≼";
var PrecedesTilde = "≾";
var preceq = "⪯";
var precnapprox = "⪹";
var precneqq = "⪵";
var precnsim = "⋨";
var pre = "⪯";
var prE = "⪳";
var precsim = "≾";
var prime = "′";
var Prime = "″";
var primes = "ℙ";
var prnap = "⪹";
var prnE = "⪵";
var prnsim = "⋨";
var prod = "∏";
var Product = "∏";
var profalar = "⌮";
var profline = "⌒";
var profsurf = "⌓";
var prop = "∝";
var Proportional = "∝";
var Proportion = "∷";
var propto = "∝";
var prsim = "≾";
var prurel = "⊰";
var Pscr = "𝒫";
var pscr = "𝓅";
var Psi = "Ψ";
var psi = "ψ";
var puncsp = " ";
var Qfr = "𝔔";
var qfr = "𝔮";
var qint = "⨌";
var qopf = "𝕢";
var Qopf = "ℚ";
var qprime = "⁗";
var Qscr = "𝒬";
var qscr = "𝓆";
var quaternions = "ℍ";
var quatint = "⨖";
var quest = "?";
var questeq = "≟";
var quot$2 = "\"";
var QUOT$1 = "\"";
var rAarr = "⇛";
var race = "∽̱";
var Racute = "Ŕ";
var racute = "ŕ";
var radic = "√";
var raemptyv = "⦳";
var rang = "⟩";
var Rang = "⟫";
var rangd = "⦒";
var range = "⦥";
var rangle = "⟩";
var raquo$1 = "»";
var rarrap = "⥵";
var rarrb = "⇥";
var rarrbfs = "⤠";
var rarrc = "⤳";
var rarr = "→";
var Rarr = "↠";
var rArr = "⇒";
var rarrfs = "⤞";
var rarrhk = "↪";
var rarrlp = "↬";
var rarrpl = "⥅";
var rarrsim = "⥴";
var Rarrtl = "⤖";
var rarrtl = "↣";
var rarrw = "↝";
var ratail = "⤚";
var rAtail = "⤜";
var ratio = "∶";
var rationals = "ℚ";
var rbarr = "⤍";
var rBarr = "⤏";
var RBarr = "⤐";
var rbbrk = "❳";
var rbrace = "}";
var rbrack = "]";
var rbrke = "⦌";
var rbrksld = "⦎";
var rbrkslu = "⦐";
var Rcaron = "Ř";
var rcaron = "ř";
var Rcedil = "Ŗ";
var rcedil = "ŗ";
var rceil = "⌉";
var rcub = "}";
var Rcy = "Р";
var rcy = "р";
var rdca = "⤷";
var rdldhar = "⥩";
var rdquo = "”";
var rdquor = "”";
var rdsh = "↳";
var real = "ℜ";
var realine = "ℛ";
var realpart = "ℜ";
var reals = "ℝ";
var Re = "ℜ";
var rect = "▭";
var reg$1 = "®";
var REG$1 = "®";
var ReverseElement = "∋";
var ReverseEquilibrium = "⇋";
var ReverseUpEquilibrium = "⥯";
var rfisht = "⥽";
var rfloor = "⌋";
var rfr = "𝔯";
var Rfr = "ℜ";
var rHar = "⥤";
var rhard = "⇁";
var rharu = "⇀";
var rharul = "⥬";
var Rho = "Ρ";
var rho = "ρ";
var rhov = "ϱ";
var RightAngleBracket = "⟩";
var RightArrowBar = "⇥";
var rightarrow = "→";
var RightArrow = "→";
var Rightarrow = "⇒";
var RightArrowLeftArrow = "⇄";
var rightarrowtail = "↣";
var RightCeiling = "⌉";
var RightDoubleBracket = "⟧";
var RightDownTeeVector = "⥝";
var RightDownVectorBar = "⥕";
var RightDownVector = "⇂";
var RightFloor = "⌋";
var rightharpoondown = "⇁";
var rightharpoonup = "⇀";
var rightleftarrows = "⇄";
var rightleftharpoons = "⇌";
var rightrightarrows = "⇉";
var rightsquigarrow = "↝";
var RightTeeArrow = "↦";
var RightTee = "⊢";
var RightTeeVector = "⥛";
var rightthreetimes = "⋌";
var RightTriangleBar = "⧐";
var RightTriangle = "⊳";
var RightTriangleEqual = "⊵";
var RightUpDownVector = "⥏";
var RightUpTeeVector = "⥜";
var RightUpVectorBar = "⥔";
var RightUpVector = "↾";
var RightVectorBar = "⥓";
var RightVector = "⇀";
var ring = "˚";
var risingdotseq = "≓";
var rlarr = "⇄";
var rlhar = "⇌";
var rlm = "‏";
var rmoustache = "⎱";
var rmoust = "⎱";
var rnmid = "⫮";
var roang = "⟭";
var roarr = "⇾";
var robrk = "⟧";
var ropar = "⦆";
var ropf = "𝕣";
var Ropf = "ℝ";
var roplus = "⨮";
var rotimes = "⨵";
var RoundImplies = "⥰";
var rpar = ")";
var rpargt = "⦔";
var rppolint = "⨒";
var rrarr = "⇉";
var Rrightarrow = "⇛";
var rsaquo = "›";
var rscr = "𝓇";
var Rscr = "ℛ";
var rsh = "↱";
var Rsh = "↱";
var rsqb = "]";
var rsquo = "’";
var rsquor = "’";
var rthree = "⋌";
var rtimes = "⋊";
var rtri = "▹";
var rtrie = "⊵";
var rtrif = "▸";
var rtriltri = "⧎";
var RuleDelayed = "⧴";
var ruluhar = "⥨";
var rx = "℞";
var Sacute = "Ś";
var sacute = "ś";
var sbquo = "‚";
var scap = "⪸";
var Scaron = "Š";
var scaron = "š";
var Sc = "⪼";
var sc = "≻";
var sccue = "≽";
var sce = "⪰";
var scE = "⪴";
var Scedil = "Ş";
var scedil = "ş";
var Scirc = "Ŝ";
var scirc = "ŝ";
var scnap = "⪺";
var scnE = "⪶";
var scnsim = "⋩";
var scpolint = "⨓";
var scsim = "≿";
var Scy = "С";
var scy = "с";
var sdotb = "⊡";
var sdot = "⋅";
var sdote = "⩦";
var searhk = "⤥";
var searr = "↘";
var seArr = "⇘";
var searrow = "↘";
var sect$1 = "§";
var semi = ";";
var seswar = "⤩";
var setminus = "∖";
var setmn = "∖";
var sext = "✶";
var Sfr = "𝔖";
var sfr = "𝔰";
var sfrown = "⌢";
var sharp = "♯";
var SHCHcy = "Щ";
var shchcy = "щ";
var SHcy = "Ш";
var shcy = "ш";
var ShortDownArrow = "↓";
var ShortLeftArrow = "←";
var shortmid = "∣";
var shortparallel = "∥";
var ShortRightArrow = "→";
var ShortUpArrow = "↑";
var shy$1 = "­";
var Sigma = "Σ";
var sigma = "σ";
var sigmaf = "ς";
var sigmav = "ς";
var sim = "∼";
var simdot = "⩪";
var sime = "≃";
var simeq = "≃";
var simg = "⪞";
var simgE = "⪠";
var siml = "⪝";
var simlE = "⪟";
var simne = "≆";
var simplus = "⨤";
var simrarr = "⥲";
var slarr = "←";
var SmallCircle = "∘";
var smallsetminus = "∖";
var smashp = "⨳";
var smeparsl = "⧤";
var smid = "∣";
var smile = "⌣";
var smt = "⪪";
var smte = "⪬";
var smtes = "⪬︀";
var SOFTcy = "Ь";
var softcy = "ь";
var solbar = "⌿";
var solb = "⧄";
var sol = "/";
var Sopf = "𝕊";
var sopf = "𝕤";
var spades = "♠";
var spadesuit = "♠";
var spar = "∥";
var sqcap = "⊓";
var sqcaps = "⊓︀";
var sqcup = "⊔";
var sqcups = "⊔︀";
var Sqrt = "√";
var sqsub = "⊏";
var sqsube = "⊑";
var sqsubset = "⊏";
var sqsubseteq = "⊑";
var sqsup = "⊐";
var sqsupe = "⊒";
var sqsupset = "⊐";
var sqsupseteq = "⊒";
var square = "□";
var Square = "□";
var SquareIntersection = "⊓";
var SquareSubset = "⊏";
var SquareSubsetEqual = "⊑";
var SquareSuperset = "⊐";
var SquareSupersetEqual = "⊒";
var SquareUnion = "⊔";
var squarf = "▪";
var squ = "□";
var squf = "▪";
var srarr = "→";
var Sscr = "𝒮";
var sscr = "𝓈";
var ssetmn = "∖";
var ssmile = "⌣";
var sstarf = "⋆";
var Star = "⋆";
var star = "☆";
var starf = "★";
var straightepsilon = "ϵ";
var straightphi = "ϕ";
var strns = "¯";
var sub = "⊂";
var Sub = "⋐";
var subdot = "⪽";
var subE = "⫅";
var sube = "⊆";
var subedot = "⫃";
var submult = "⫁";
var subnE = "⫋";
var subne = "⊊";
var subplus = "⪿";
var subrarr = "⥹";
var subset = "⊂";
var Subset = "⋐";
var subseteq = "⊆";
var subseteqq = "⫅";
var SubsetEqual = "⊆";
var subsetneq = "⊊";
var subsetneqq = "⫋";
var subsim = "⫇";
var subsub = "⫕";
var subsup = "⫓";
var succapprox = "⪸";
var succ = "≻";
var succcurlyeq = "≽";
var Succeeds = "≻";
var SucceedsEqual = "⪰";
var SucceedsSlantEqual = "≽";
var SucceedsTilde = "≿";
var succeq = "⪰";
var succnapprox = "⪺";
var succneqq = "⪶";
var succnsim = "⋩";
var succsim = "≿";
var SuchThat = "∋";
var sum = "∑";
var Sum = "∑";
var sung = "♪";
var sup1$1 = "¹";
var sup2$1 = "²";
var sup3$1 = "³";
var sup = "⊃";
var Sup = "⋑";
var supdot = "⪾";
var supdsub = "⫘";
var supE = "⫆";
var supe = "⊇";
var supedot = "⫄";
var Superset = "⊃";
var SupersetEqual = "⊇";
var suphsol = "⟉";
var suphsub = "⫗";
var suplarr = "⥻";
var supmult = "⫂";
var supnE = "⫌";
var supne = "⊋";
var supplus = "⫀";
var supset = "⊃";
var Supset = "⋑";
var supseteq = "⊇";
var supseteqq = "⫆";
var supsetneq = "⊋";
var supsetneqq = "⫌";
var supsim = "⫈";
var supsub = "⫔";
var supsup = "⫖";
var swarhk = "⤦";
var swarr = "↙";
var swArr = "⇙";
var swarrow = "↙";
var swnwar = "⤪";
var szlig$1 = "ß";
var Tab = "\t";
var target = "⌖";
var Tau = "Τ";
var tau = "τ";
var tbrk = "⎴";
var Tcaron = "Ť";
var tcaron = "ť";
var Tcedil = "Ţ";
var tcedil = "ţ";
var Tcy = "Т";
var tcy = "т";
var tdot = "⃛";
var telrec = "⌕";
var Tfr = "𝔗";
var tfr = "𝔱";
var there4 = "∴";
var therefore = "∴";
var Therefore = "∴";
var Theta = "Θ";
var theta = "θ";
var thetasym = "ϑ";
var thetav = "ϑ";
var thickapprox = "≈";
var thicksim = "∼";
var ThickSpace = "  ";
var ThinSpace = " ";
var thinsp = " ";
var thkap = "≈";
var thksim = "∼";
var THORN$1 = "Þ";
var thorn$1 = "þ";
var tilde = "˜";
var Tilde = "∼";
var TildeEqual = "≃";
var TildeFullEqual = "≅";
var TildeTilde = "≈";
var timesbar = "⨱";
var timesb = "⊠";
var times$1 = "×";
var timesd = "⨰";
var tint = "∭";
var toea = "⤨";
var topbot = "⌶";
var topcir = "⫱";
var top = "⊤";
var Topf = "𝕋";
var topf = "𝕥";
var topfork = "⫚";
var tosa = "⤩";
var tprime = "‴";
var trade = "™";
var TRADE = "™";
var triangle = "▵";
var triangledown = "▿";
var triangleleft = "◃";
var trianglelefteq = "⊴";
var triangleq = "≜";
var triangleright = "▹";
var trianglerighteq = "⊵";
var tridot = "◬";
var trie = "≜";
var triminus = "⨺";
var TripleDot = "⃛";
var triplus = "⨹";
var trisb = "⧍";
var tritime = "⨻";
var trpezium = "⏢";
var Tscr = "𝒯";
var tscr = "𝓉";
var TScy = "Ц";
var tscy = "ц";
var TSHcy = "Ћ";
var tshcy = "ћ";
var Tstrok = "Ŧ";
var tstrok = "ŧ";
var twixt = "≬";
var twoheadleftarrow = "↞";
var twoheadrightarrow = "↠";
var Uacute$1 = "Ú";
var uacute$1 = "ú";
var uarr = "↑";
var Uarr = "↟";
var uArr = "⇑";
var Uarrocir = "⥉";
var Ubrcy = "Ў";
var ubrcy = "ў";
var Ubreve = "Ŭ";
var ubreve = "ŭ";
var Ucirc$1 = "Û";
var ucirc$1 = "û";
var Ucy = "У";
var ucy = "у";
var udarr = "⇅";
var Udblac = "Ű";
var udblac = "ű";
var udhar = "⥮";
var ufisht = "⥾";
var Ufr = "𝔘";
var ufr = "𝔲";
var Ugrave$1 = "Ù";
var ugrave$1 = "ù";
var uHar = "⥣";
var uharl = "↿";
var uharr = "↾";
var uhblk = "▀";
var ulcorn = "⌜";
var ulcorner = "⌜";
var ulcrop = "⌏";
var ultri = "◸";
var Umacr = "Ū";
var umacr = "ū";
var uml$1 = "¨";
var UnderBar = "_";
var UnderBrace = "⏟";
var UnderBracket = "⎵";
var UnderParenthesis = "⏝";
var Union = "⋃";
var UnionPlus = "⊎";
var Uogon = "Ų";
var uogon = "ų";
var Uopf = "𝕌";
var uopf = "𝕦";
var UpArrowBar = "⤒";
var uparrow = "↑";
var UpArrow = "↑";
var Uparrow = "⇑";
var UpArrowDownArrow = "⇅";
var updownarrow = "↕";
var UpDownArrow = "↕";
var Updownarrow = "⇕";
var UpEquilibrium = "⥮";
var upharpoonleft = "↿";
var upharpoonright = "↾";
var uplus = "⊎";
var UpperLeftArrow = "↖";
var UpperRightArrow = "↗";
var upsi = "υ";
var Upsi = "ϒ";
var upsih = "ϒ";
var Upsilon = "Υ";
var upsilon = "υ";
var UpTeeArrow = "↥";
var UpTee = "⊥";
var upuparrows = "⇈";
var urcorn = "⌝";
var urcorner = "⌝";
var urcrop = "⌎";
var Uring = "Ů";
var uring = "ů";
var urtri = "◹";
var Uscr = "𝒰";
var uscr = "𝓊";
var utdot = "⋰";
var Utilde = "Ũ";
var utilde = "ũ";
var utri = "▵";
var utrif = "▴";
var uuarr = "⇈";
var Uuml$1 = "Ü";
var uuml$1 = "ü";
var uwangle = "⦧";
var vangrt = "⦜";
var varepsilon = "ϵ";
var varkappa = "ϰ";
var varnothing = "∅";
var varphi = "ϕ";
var varpi = "ϖ";
var varpropto = "∝";
var varr = "↕";
var vArr = "⇕";
var varrho = "ϱ";
var varsigma = "ς";
var varsubsetneq = "⊊︀";
var varsubsetneqq = "⫋︀";
var varsupsetneq = "⊋︀";
var varsupsetneqq = "⫌︀";
var vartheta = "ϑ";
var vartriangleleft = "⊲";
var vartriangleright = "⊳";
var vBar = "⫨";
var Vbar = "⫫";
var vBarv = "⫩";
var Vcy = "В";
var vcy = "в";
var vdash = "⊢";
var vDash = "⊨";
var Vdash = "⊩";
var VDash = "⊫";
var Vdashl = "⫦";
var veebar = "⊻";
var vee = "∨";
var Vee = "⋁";
var veeeq = "≚";
var vellip = "⋮";
var verbar = "|";
var Verbar = "‖";
var vert = "|";
var Vert = "‖";
var VerticalBar = "∣";
var VerticalLine = "|";
var VerticalSeparator = "❘";
var VerticalTilde = "≀";
var VeryThinSpace = " ";
var Vfr = "𝔙";
var vfr = "𝔳";
var vltri = "⊲";
var vnsub = "⊂⃒";
var vnsup = "⊃⃒";
var Vopf = "𝕍";
var vopf = "𝕧";
var vprop = "∝";
var vrtri = "⊳";
var Vscr = "𝒱";
var vscr = "𝓋";
var vsubnE = "⫋︀";
var vsubne = "⊊︀";
var vsupnE = "⫌︀";
var vsupne = "⊋︀";
var Vvdash = "⊪";
var vzigzag = "⦚";
var Wcirc = "Ŵ";
var wcirc = "ŵ";
var wedbar = "⩟";
var wedge = "∧";
var Wedge = "⋀";
var wedgeq = "≙";
var weierp = "℘";
var Wfr = "𝔚";
var wfr = "𝔴";
var Wopf = "𝕎";
var wopf = "𝕨";
var wp = "℘";
var wr = "≀";
var wreath = "≀";
var Wscr = "𝒲";
var wscr = "𝓌";
var xcap = "⋂";
var xcirc = "◯";
var xcup = "⋃";
var xdtri = "▽";
var Xfr = "𝔛";
var xfr = "𝔵";
var xharr = "⟷";
var xhArr = "⟺";
var Xi = "Ξ";
var xi = "ξ";
var xlarr = "⟵";
var xlArr = "⟸";
var xmap = "⟼";
var xnis = "⋻";
var xodot = "⨀";
var Xopf = "𝕏";
var xopf = "𝕩";
var xoplus = "⨁";
var xotime = "⨂";
var xrarr = "⟶";
var xrArr = "⟹";
var Xscr = "𝒳";
var xscr = "𝓍";
var xsqcup = "⨆";
var xuplus = "⨄";
var xutri = "△";
var xvee = "⋁";
var xwedge = "⋀";
var Yacute$1 = "Ý";
var yacute$1 = "ý";
var YAcy = "Я";
var yacy = "я";
var Ycirc = "Ŷ";
var ycirc = "ŷ";
var Ycy = "Ы";
var ycy = "ы";
var yen$1 = "¥";
var Yfr = "𝔜";
var yfr = "𝔶";
var YIcy = "Ї";
var yicy = "ї";
var Yopf = "𝕐";
var yopf = "𝕪";
var Yscr = "𝒴";
var yscr = "𝓎";
var YUcy = "Ю";
var yucy = "ю";
var yuml$1 = "ÿ";
var Yuml = "Ÿ";
var Zacute = "Ź";
var zacute = "ź";
var Zcaron = "Ž";
var zcaron = "ž";
var Zcy = "З";
var zcy = "з";
var Zdot = "Ż";
var zdot = "ż";
var zeetrf = "ℨ";
var ZeroWidthSpace = "​";
var Zeta = "Ζ";
var zeta = "ζ";
var zfr = "𝔷";
var Zfr = "ℨ";
var ZHcy = "Ж";
var zhcy = "ж";
var zigrarr = "⇝";
var zopf = "𝕫";
var Zopf = "ℤ";
var Zscr = "𝒵";
var zscr = "𝓏";
var zwj = "‍";
var zwnj = "‌";
var require$$1$1 = {
	Aacute: Aacute$1,
	aacute: aacute$1,
	Abreve: Abreve,
	abreve: abreve,
	ac: ac,
	acd: acd,
	acE: acE,
	Acirc: Acirc$1,
	acirc: acirc$1,
	acute: acute$1,
	Acy: Acy,
	acy: acy,
	AElig: AElig$1,
	aelig: aelig$1,
	af: af,
	Afr: Afr,
	afr: afr,
	Agrave: Agrave$1,
	agrave: agrave$1,
	alefsym: alefsym,
	aleph: aleph,
	Alpha: Alpha,
	alpha: alpha,
	Amacr: Amacr,
	amacr: amacr,
	amalg: amalg,
	amp: amp$2,
	AMP: AMP$1,
	andand: andand,
	And: And,
	and: and,
	andd: andd,
	andslope: andslope,
	andv: andv,
	ang: ang,
	ange: ange,
	angle: angle,
	angmsdaa: angmsdaa,
	angmsdab: angmsdab,
	angmsdac: angmsdac,
	angmsdad: angmsdad,
	angmsdae: angmsdae,
	angmsdaf: angmsdaf,
	angmsdag: angmsdag,
	angmsdah: angmsdah,
	angmsd: angmsd,
	angrt: angrt,
	angrtvb: angrtvb,
	angrtvbd: angrtvbd,
	angsph: angsph,
	angst: angst,
	angzarr: angzarr,
	Aogon: Aogon,
	aogon: aogon,
	Aopf: Aopf,
	aopf: aopf,
	apacir: apacir,
	ap: ap,
	apE: apE,
	ape: ape,
	apid: apid,
	apos: apos$1,
	ApplyFunction: ApplyFunction,
	approx: approx,
	approxeq: approxeq,
	Aring: Aring$1,
	aring: aring$1,
	Ascr: Ascr,
	ascr: ascr,
	Assign: Assign,
	ast: ast,
	asymp: asymp,
	asympeq: asympeq,
	Atilde: Atilde$1,
	atilde: atilde$1,
	Auml: Auml$1,
	auml: auml$1,
	awconint: awconint,
	awint: awint,
	backcong: backcong,
	backepsilon: backepsilon,
	backprime: backprime,
	backsim: backsim,
	backsimeq: backsimeq,
	Backslash: Backslash,
	Barv: Barv,
	barvee: barvee,
	barwed: barwed,
	Barwed: Barwed,
	barwedge: barwedge,
	bbrk: bbrk,
	bbrktbrk: bbrktbrk,
	bcong: bcong,
	Bcy: Bcy,
	bcy: bcy,
	bdquo: bdquo,
	becaus: becaus,
	because: because,
	Because: Because,
	bemptyv: bemptyv,
	bepsi: bepsi,
	bernou: bernou,
	Bernoullis: Bernoullis,
	Beta: Beta,
	beta: beta,
	beth: beth,
	between: between,
	Bfr: Bfr,
	bfr: bfr,
	bigcap: bigcap,
	bigcirc: bigcirc,
	bigcup: bigcup,
	bigodot: bigodot,
	bigoplus: bigoplus,
	bigotimes: bigotimes,
	bigsqcup: bigsqcup,
	bigstar: bigstar,
	bigtriangledown: bigtriangledown,
	bigtriangleup: bigtriangleup,
	biguplus: biguplus,
	bigvee: bigvee,
	bigwedge: bigwedge,
	bkarow: bkarow,
	blacklozenge: blacklozenge,
	blacksquare: blacksquare,
	blacktriangle: blacktriangle,
	blacktriangledown: blacktriangledown,
	blacktriangleleft: blacktriangleleft,
	blacktriangleright: blacktriangleright,
	blank: blank,
	blk12: blk12,
	blk14: blk14,
	blk34: blk34,
	block: block,
	bne: bne,
	bnequiv: bnequiv,
	bNot: bNot,
	bnot: bnot,
	Bopf: Bopf,
	bopf: bopf,
	bot: bot,
	bottom: bottom,
	bowtie: bowtie,
	boxbox: boxbox,
	boxdl: boxdl,
	boxdL: boxdL,
	boxDl: boxDl,
	boxDL: boxDL,
	boxdr: boxdr,
	boxdR: boxdR,
	boxDr: boxDr,
	boxDR: boxDR,
	boxh: boxh,
	boxH: boxH,
	boxhd: boxhd,
	boxHd: boxHd,
	boxhD: boxhD,
	boxHD: boxHD,
	boxhu: boxhu,
	boxHu: boxHu,
	boxhU: boxhU,
	boxHU: boxHU,
	boxminus: boxminus,
	boxplus: boxplus,
	boxtimes: boxtimes,
	boxul: boxul,
	boxuL: boxuL,
	boxUl: boxUl,
	boxUL: boxUL,
	boxur: boxur,
	boxuR: boxuR,
	boxUr: boxUr,
	boxUR: boxUR,
	boxv: boxv,
	boxV: boxV,
	boxvh: boxvh,
	boxvH: boxvH,
	boxVh: boxVh,
	boxVH: boxVH,
	boxvl: boxvl,
	boxvL: boxvL,
	boxVl: boxVl,
	boxVL: boxVL,
	boxvr: boxvr,
	boxvR: boxvR,
	boxVr: boxVr,
	boxVR: boxVR,
	bprime: bprime,
	breve: breve,
	Breve: Breve,
	brvbar: brvbar$1,
	bscr: bscr,
	Bscr: Bscr,
	bsemi: bsemi,
	bsim: bsim,
	bsime: bsime,
	bsolb: bsolb,
	bsol: bsol,
	bsolhsub: bsolhsub,
	bull: bull,
	bullet: bullet,
	bump: bump,
	bumpE: bumpE,
	bumpe: bumpe,
	Bumpeq: Bumpeq,
	bumpeq: bumpeq,
	Cacute: Cacute,
	cacute: cacute,
	capand: capand,
	capbrcup: capbrcup,
	capcap: capcap,
	cap: cap,
	Cap: Cap,
	capcup: capcup,
	capdot: capdot,
	CapitalDifferentialD: CapitalDifferentialD,
	caps: caps,
	caret: caret,
	caron: caron,
	Cayleys: Cayleys,
	ccaps: ccaps,
	Ccaron: Ccaron,
	ccaron: ccaron,
	Ccedil: Ccedil$1,
	ccedil: ccedil$1,
	Ccirc: Ccirc,
	ccirc: ccirc,
	Cconint: Cconint,
	ccups: ccups,
	ccupssm: ccupssm,
	Cdot: Cdot,
	cdot: cdot,
	cedil: cedil$1,
	Cedilla: Cedilla,
	cemptyv: cemptyv,
	cent: cent$1,
	centerdot: centerdot,
	CenterDot: CenterDot,
	cfr: cfr,
	Cfr: Cfr,
	CHcy: CHcy,
	chcy: chcy,
	check: check,
	checkmark: checkmark,
	Chi: Chi,
	chi: chi,
	circ: circ,
	circeq: circeq,
	circlearrowleft: circlearrowleft,
	circlearrowright: circlearrowright,
	circledast: circledast,
	circledcirc: circledcirc,
	circleddash: circleddash,
	CircleDot: CircleDot,
	circledR: circledR,
	circledS: circledS,
	CircleMinus: CircleMinus,
	CirclePlus: CirclePlus,
	CircleTimes: CircleTimes,
	cir: cir,
	cirE: cirE,
	cire: cire,
	cirfnint: cirfnint,
	cirmid: cirmid,
	cirscir: cirscir,
	ClockwiseContourIntegral: ClockwiseContourIntegral,
	CloseCurlyDoubleQuote: CloseCurlyDoubleQuote,
	CloseCurlyQuote: CloseCurlyQuote,
	clubs: clubs,
	clubsuit: clubsuit,
	colon: colon,
	Colon: Colon,
	Colone: Colone,
	colone: colone,
	coloneq: coloneq,
	comma: comma,
	commat: commat,
	comp: comp,
	compfn: compfn,
	complement: complement,
	complexes: complexes,
	cong: cong,
	congdot: congdot,
	Congruent: Congruent,
	conint: conint,
	Conint: Conint,
	ContourIntegral: ContourIntegral,
	copf: copf,
	Copf: Copf,
	coprod: coprod,
	Coproduct: Coproduct,
	copy: copy$1,
	COPY: COPY$1,
	copysr: copysr,
	CounterClockwiseContourIntegral: CounterClockwiseContourIntegral,
	crarr: crarr,
	cross: cross,
	Cross: Cross,
	Cscr: Cscr,
	cscr: cscr,
	csub: csub,
	csube: csube,
	csup: csup,
	csupe: csupe,
	ctdot: ctdot,
	cudarrl: cudarrl,
	cudarrr: cudarrr,
	cuepr: cuepr,
	cuesc: cuesc,
	cularr: cularr,
	cularrp: cularrp,
	cupbrcap: cupbrcap,
	cupcap: cupcap,
	CupCap: CupCap,
	cup: cup,
	Cup: Cup,
	cupcup: cupcup,
	cupdot: cupdot,
	cupor: cupor,
	cups: cups,
	curarr: curarr,
	curarrm: curarrm,
	curlyeqprec: curlyeqprec,
	curlyeqsucc: curlyeqsucc,
	curlyvee: curlyvee,
	curlywedge: curlywedge,
	curren: curren$1,
	curvearrowleft: curvearrowleft,
	curvearrowright: curvearrowright,
	cuvee: cuvee,
	cuwed: cuwed,
	cwconint: cwconint,
	cwint: cwint,
	cylcty: cylcty,
	dagger: dagger,
	Dagger: Dagger,
	daleth: daleth,
	darr: darr,
	Darr: Darr,
	dArr: dArr,
	dash: dash,
	Dashv: Dashv,
	dashv: dashv,
	dbkarow: dbkarow,
	dblac: dblac,
	Dcaron: Dcaron,
	dcaron: dcaron,
	Dcy: Dcy,
	dcy: dcy,
	ddagger: ddagger,
	ddarr: ddarr,
	DD: DD,
	dd: dd,
	DDotrahd: DDotrahd,
	ddotseq: ddotseq,
	deg: deg$1,
	Del: Del,
	Delta: Delta,
	delta: delta,
	demptyv: demptyv,
	dfisht: dfisht,
	Dfr: Dfr,
	dfr: dfr,
	dHar: dHar,
	dharl: dharl,
	dharr: dharr,
	DiacriticalAcute: DiacriticalAcute,
	DiacriticalDot: DiacriticalDot,
	DiacriticalDoubleAcute: DiacriticalDoubleAcute,
	DiacriticalGrave: DiacriticalGrave,
	DiacriticalTilde: DiacriticalTilde,
	diam: diam,
	diamond: diamond,
	Diamond: Diamond,
	diamondsuit: diamondsuit,
	diams: diams,
	die: die,
	DifferentialD: DifferentialD,
	digamma: digamma,
	disin: disin,
	div: div,
	divide: divide$1,
	divideontimes: divideontimes,
	divonx: divonx,
	DJcy: DJcy,
	djcy: djcy,
	dlcorn: dlcorn,
	dlcrop: dlcrop,
	dollar: dollar,
	Dopf: Dopf,
	dopf: dopf,
	Dot: Dot,
	dot: dot,
	DotDot: DotDot,
	doteq: doteq,
	doteqdot: doteqdot,
	DotEqual: DotEqual,
	dotminus: dotminus,
	dotplus: dotplus,
	dotsquare: dotsquare,
	doublebarwedge: doublebarwedge,
	DoubleContourIntegral: DoubleContourIntegral,
	DoubleDot: DoubleDot,
	DoubleDownArrow: DoubleDownArrow,
	DoubleLeftArrow: DoubleLeftArrow,
	DoubleLeftRightArrow: DoubleLeftRightArrow,
	DoubleLeftTee: DoubleLeftTee,
	DoubleLongLeftArrow: DoubleLongLeftArrow,
	DoubleLongLeftRightArrow: DoubleLongLeftRightArrow,
	DoubleLongRightArrow: DoubleLongRightArrow,
	DoubleRightArrow: DoubleRightArrow,
	DoubleRightTee: DoubleRightTee,
	DoubleUpArrow: DoubleUpArrow,
	DoubleUpDownArrow: DoubleUpDownArrow,
	DoubleVerticalBar: DoubleVerticalBar,
	DownArrowBar: DownArrowBar,
	downarrow: downarrow,
	DownArrow: DownArrow,
	Downarrow: Downarrow,
	DownArrowUpArrow: DownArrowUpArrow,
	DownBreve: DownBreve,
	downdownarrows: downdownarrows,
	downharpoonleft: downharpoonleft,
	downharpoonright: downharpoonright,
	DownLeftRightVector: DownLeftRightVector,
	DownLeftTeeVector: DownLeftTeeVector,
	DownLeftVectorBar: DownLeftVectorBar,
	DownLeftVector: DownLeftVector,
	DownRightTeeVector: DownRightTeeVector,
	DownRightVectorBar: DownRightVectorBar,
	DownRightVector: DownRightVector,
	DownTeeArrow: DownTeeArrow,
	DownTee: DownTee,
	drbkarow: drbkarow,
	drcorn: drcorn,
	drcrop: drcrop,
	Dscr: Dscr,
	dscr: dscr,
	DScy: DScy,
	dscy: dscy,
	dsol: dsol,
	Dstrok: Dstrok,
	dstrok: dstrok,
	dtdot: dtdot,
	dtri: dtri,
	dtrif: dtrif,
	duarr: duarr,
	duhar: duhar,
	dwangle: dwangle,
	DZcy: DZcy,
	dzcy: dzcy,
	dzigrarr: dzigrarr,
	Eacute: Eacute$1,
	eacute: eacute$1,
	easter: easter,
	Ecaron: Ecaron,
	ecaron: ecaron,
	Ecirc: Ecirc$1,
	ecirc: ecirc$1,
	ecir: ecir,
	ecolon: ecolon,
	Ecy: Ecy,
	ecy: ecy,
	eDDot: eDDot,
	Edot: Edot,
	edot: edot,
	eDot: eDot,
	ee: ee,
	efDot: efDot,
	Efr: Efr,
	efr: efr,
	eg: eg,
	Egrave: Egrave$1,
	egrave: egrave$1,
	egs: egs,
	egsdot: egsdot,
	el: el,
	Element: Element,
	elinters: elinters,
	ell: ell,
	els: els,
	elsdot: elsdot,
	Emacr: Emacr,
	emacr: emacr,
	empty: empty,
	emptyset: emptyset,
	EmptySmallSquare: EmptySmallSquare,
	emptyv: emptyv,
	EmptyVerySmallSquare: EmptyVerySmallSquare,
	emsp13: emsp13,
	emsp14: emsp14,
	emsp: emsp,
	ENG: ENG,
	eng: eng,
	ensp: ensp,
	Eogon: Eogon,
	eogon: eogon,
	Eopf: Eopf,
	eopf: eopf,
	epar: epar,
	eparsl: eparsl,
	eplus: eplus,
	epsi: epsi,
	Epsilon: Epsilon,
	epsilon: epsilon,
	epsiv: epsiv,
	eqcirc: eqcirc,
	eqcolon: eqcolon,
	eqsim: eqsim,
	eqslantgtr: eqslantgtr,
	eqslantless: eqslantless,
	Equal: Equal,
	equals: equals,
	EqualTilde: EqualTilde,
	equest: equest,
	Equilibrium: Equilibrium,
	equiv: equiv,
	equivDD: equivDD,
	eqvparsl: eqvparsl,
	erarr: erarr,
	erDot: erDot,
	escr: escr,
	Escr: Escr,
	esdot: esdot,
	Esim: Esim,
	esim: esim,
	Eta: Eta,
	eta: eta,
	ETH: ETH$1,
	eth: eth$1,
	Euml: Euml$1,
	euml: euml$1,
	euro: euro,
	excl: excl,
	exist: exist,
	Exists: Exists,
	expectation: expectation,
	exponentiale: exponentiale,
	ExponentialE: ExponentialE,
	fallingdotseq: fallingdotseq,
	Fcy: Fcy,
	fcy: fcy,
	female: female,
	ffilig: ffilig,
	fflig: fflig,
	ffllig: ffllig,
	Ffr: Ffr,
	ffr: ffr,
	filig: filig,
	FilledSmallSquare: FilledSmallSquare,
	FilledVerySmallSquare: FilledVerySmallSquare,
	fjlig: fjlig,
	flat: flat,
	fllig: fllig,
	fltns: fltns,
	fnof: fnof,
	Fopf: Fopf,
	fopf: fopf,
	forall: forall,
	ForAll: ForAll,
	fork: fork,
	forkv: forkv,
	Fouriertrf: Fouriertrf,
	fpartint: fpartint,
	frac12: frac12$1,
	frac13: frac13,
	frac14: frac14$1,
	frac15: frac15,
	frac16: frac16,
	frac18: frac18,
	frac23: frac23,
	frac25: frac25,
	frac34: frac34$1,
	frac35: frac35,
	frac38: frac38,
	frac45: frac45,
	frac56: frac56,
	frac58: frac58,
	frac78: frac78,
	frasl: frasl,
	frown: frown,
	fscr: fscr,
	Fscr: Fscr,
	gacute: gacute,
	Gamma: Gamma,
	gamma: gamma,
	Gammad: Gammad,
	gammad: gammad,
	gap: gap,
	Gbreve: Gbreve,
	gbreve: gbreve,
	Gcedil: Gcedil,
	Gcirc: Gcirc,
	gcirc: gcirc,
	Gcy: Gcy,
	gcy: gcy,
	Gdot: Gdot,
	gdot: gdot,
	ge: ge,
	gE: gE,
	gEl: gEl,
	gel: gel,
	geq: geq,
	geqq: geqq,
	geqslant: geqslant,
	gescc: gescc,
	ges: ges,
	gesdot: gesdot,
	gesdoto: gesdoto,
	gesdotol: gesdotol,
	gesl: gesl,
	gesles: gesles,
	Gfr: Gfr,
	gfr: gfr,
	gg: gg,
	Gg: Gg,
	ggg: ggg,
	gimel: gimel,
	GJcy: GJcy,
	gjcy: gjcy,
	gla: gla,
	gl: gl,
	glE: glE,
	glj: glj,
	gnap: gnap,
	gnapprox: gnapprox,
	gne: gne,
	gnE: gnE,
	gneq: gneq,
	gneqq: gneqq,
	gnsim: gnsim,
	Gopf: Gopf,
	gopf: gopf,
	grave: grave,
	GreaterEqual: GreaterEqual,
	GreaterEqualLess: GreaterEqualLess,
	GreaterFullEqual: GreaterFullEqual,
	GreaterGreater: GreaterGreater,
	GreaterLess: GreaterLess,
	GreaterSlantEqual: GreaterSlantEqual,
	GreaterTilde: GreaterTilde,
	Gscr: Gscr,
	gscr: gscr,
	gsim: gsim,
	gsime: gsime,
	gsiml: gsiml,
	gtcc: gtcc,
	gtcir: gtcir,
	gt: gt$2,
	GT: GT$1,
	Gt: Gt,
	gtdot: gtdot,
	gtlPar: gtlPar,
	gtquest: gtquest,
	gtrapprox: gtrapprox,
	gtrarr: gtrarr,
	gtrdot: gtrdot,
	gtreqless: gtreqless,
	gtreqqless: gtreqqless,
	gtrless: gtrless,
	gtrsim: gtrsim,
	gvertneqq: gvertneqq,
	gvnE: gvnE,
	Hacek: Hacek,
	hairsp: hairsp,
	half: half,
	hamilt: hamilt,
	HARDcy: HARDcy,
	hardcy: hardcy,
	harrcir: harrcir,
	harr: harr,
	hArr: hArr,
	harrw: harrw,
	Hat: Hat,
	hbar: hbar,
	Hcirc: Hcirc,
	hcirc: hcirc,
	hearts: hearts,
	heartsuit: heartsuit,
	hellip: hellip,
	hercon: hercon,
	hfr: hfr,
	Hfr: Hfr,
	HilbertSpace: HilbertSpace,
	hksearow: hksearow,
	hkswarow: hkswarow,
	hoarr: hoarr,
	homtht: homtht,
	hookleftarrow: hookleftarrow,
	hookrightarrow: hookrightarrow,
	hopf: hopf,
	Hopf: Hopf,
	horbar: horbar,
	HorizontalLine: HorizontalLine,
	hscr: hscr,
	Hscr: Hscr,
	hslash: hslash,
	Hstrok: Hstrok,
	hstrok: hstrok,
	HumpDownHump: HumpDownHump,
	HumpEqual: HumpEqual,
	hybull: hybull,
	hyphen: hyphen,
	Iacute: Iacute$1,
	iacute: iacute$1,
	ic: ic,
	Icirc: Icirc$1,
	icirc: icirc$1,
	Icy: Icy,
	icy: icy,
	Idot: Idot,
	IEcy: IEcy,
	iecy: iecy,
	iexcl: iexcl$1,
	iff: iff,
	ifr: ifr,
	Ifr: Ifr,
	Igrave: Igrave$1,
	igrave: igrave$1,
	ii: ii,
	iiiint: iiiint,
	iiint: iiint,
	iinfin: iinfin,
	iiota: iiota,
	IJlig: IJlig,
	ijlig: ijlig,
	Imacr: Imacr,
	imacr: imacr,
	image: image,
	ImaginaryI: ImaginaryI,
	imagline: imagline,
	imagpart: imagpart,
	imath: imath,
	Im: Im,
	imof: imof,
	imped: imped,
	Implies: Implies,
	incare: incare,
	"in": "∈",
	infin: infin,
	infintie: infintie,
	inodot: inodot,
	intcal: intcal,
	int: int,
	Int: Int,
	integers: integers,
	Integral: Integral,
	intercal: intercal,
	Intersection: Intersection,
	intlarhk: intlarhk,
	intprod: intprod,
	InvisibleComma: InvisibleComma,
	InvisibleTimes: InvisibleTimes,
	IOcy: IOcy,
	iocy: iocy,
	Iogon: Iogon,
	iogon: iogon,
	Iopf: Iopf,
	iopf: iopf,
	Iota: Iota,
	iota: iota,
	iprod: iprod,
	iquest: iquest$1,
	iscr: iscr,
	Iscr: Iscr,
	isin: isin,
	isindot: isindot,
	isinE: isinE,
	isins: isins,
	isinsv: isinsv,
	isinv: isinv,
	it: it,
	Itilde: Itilde,
	itilde: itilde,
	Iukcy: Iukcy,
	iukcy: iukcy,
	Iuml: Iuml$1,
	iuml: iuml$1,
	Jcirc: Jcirc,
	jcirc: jcirc,
	Jcy: Jcy,
	jcy: jcy,
	Jfr: Jfr,
	jfr: jfr,
	jmath: jmath,
	Jopf: Jopf,
	jopf: jopf,
	Jscr: Jscr,
	jscr: jscr,
	Jsercy: Jsercy,
	jsercy: jsercy,
	Jukcy: Jukcy,
	jukcy: jukcy,
	Kappa: Kappa,
	kappa: kappa,
	kappav: kappav,
	Kcedil: Kcedil,
	kcedil: kcedil,
	Kcy: Kcy,
	kcy: kcy,
	Kfr: Kfr,
	kfr: kfr,
	kgreen: kgreen,
	KHcy: KHcy,
	khcy: khcy,
	KJcy: KJcy,
	kjcy: kjcy,
	Kopf: Kopf,
	kopf: kopf,
	Kscr: Kscr,
	kscr: kscr,
	lAarr: lAarr,
	Lacute: Lacute,
	lacute: lacute,
	laemptyv: laemptyv,
	lagran: lagran,
	Lambda: Lambda,
	lambda: lambda,
	lang: lang,
	Lang: Lang,
	langd: langd,
	langle: langle,
	lap: lap,
	Laplacetrf: Laplacetrf,
	laquo: laquo$1,
	larrb: larrb,
	larrbfs: larrbfs,
	larr: larr,
	Larr: Larr,
	lArr: lArr,
	larrfs: larrfs,
	larrhk: larrhk,
	larrlp: larrlp,
	larrpl: larrpl,
	larrsim: larrsim,
	larrtl: larrtl,
	latail: latail,
	lAtail: lAtail,
	lat: lat,
	late: late,
	lates: lates,
	lbarr: lbarr,
	lBarr: lBarr,
	lbbrk: lbbrk,
	lbrace: lbrace,
	lbrack: lbrack,
	lbrke: lbrke,
	lbrksld: lbrksld,
	lbrkslu: lbrkslu,
	Lcaron: Lcaron,
	lcaron: lcaron,
	Lcedil: Lcedil,
	lcedil: lcedil,
	lceil: lceil,
	lcub: lcub,
	Lcy: Lcy,
	lcy: lcy,
	ldca: ldca,
	ldquo: ldquo,
	ldquor: ldquor,
	ldrdhar: ldrdhar,
	ldrushar: ldrushar,
	ldsh: ldsh,
	le: le,
	lE: lE,
	LeftAngleBracket: LeftAngleBracket,
	LeftArrowBar: LeftArrowBar,
	leftarrow: leftarrow,
	LeftArrow: LeftArrow,
	Leftarrow: Leftarrow,
	LeftArrowRightArrow: LeftArrowRightArrow,
	leftarrowtail: leftarrowtail,
	LeftCeiling: LeftCeiling,
	LeftDoubleBracket: LeftDoubleBracket,
	LeftDownTeeVector: LeftDownTeeVector,
	LeftDownVectorBar: LeftDownVectorBar,
	LeftDownVector: LeftDownVector,
	LeftFloor: LeftFloor,
	leftharpoondown: leftharpoondown,
	leftharpoonup: leftharpoonup,
	leftleftarrows: leftleftarrows,
	leftrightarrow: leftrightarrow,
	LeftRightArrow: LeftRightArrow,
	Leftrightarrow: Leftrightarrow,
	leftrightarrows: leftrightarrows,
	leftrightharpoons: leftrightharpoons,
	leftrightsquigarrow: leftrightsquigarrow,
	LeftRightVector: LeftRightVector,
	LeftTeeArrow: LeftTeeArrow,
	LeftTee: LeftTee,
	LeftTeeVector: LeftTeeVector,
	leftthreetimes: leftthreetimes,
	LeftTriangleBar: LeftTriangleBar,
	LeftTriangle: LeftTriangle,
	LeftTriangleEqual: LeftTriangleEqual,
	LeftUpDownVector: LeftUpDownVector,
	LeftUpTeeVector: LeftUpTeeVector,
	LeftUpVectorBar: LeftUpVectorBar,
	LeftUpVector: LeftUpVector,
	LeftVectorBar: LeftVectorBar,
	LeftVector: LeftVector,
	lEg: lEg,
	leg: leg,
	leq: leq,
	leqq: leqq,
	leqslant: leqslant,
	lescc: lescc,
	les: les,
	lesdot: lesdot,
	lesdoto: lesdoto,
	lesdotor: lesdotor,
	lesg: lesg,
	lesges: lesges,
	lessapprox: lessapprox,
	lessdot: lessdot,
	lesseqgtr: lesseqgtr,
	lesseqqgtr: lesseqqgtr,
	LessEqualGreater: LessEqualGreater,
	LessFullEqual: LessFullEqual,
	LessGreater: LessGreater,
	lessgtr: lessgtr,
	LessLess: LessLess,
	lesssim: lesssim,
	LessSlantEqual: LessSlantEqual,
	LessTilde: LessTilde,
	lfisht: lfisht,
	lfloor: lfloor,
	Lfr: Lfr,
	lfr: lfr,
	lg: lg,
	lgE: lgE,
	lHar: lHar,
	lhard: lhard,
	lharu: lharu,
	lharul: lharul,
	lhblk: lhblk,
	LJcy: LJcy,
	ljcy: ljcy,
	llarr: llarr,
	ll: ll,
	Ll: Ll,
	llcorner: llcorner,
	Lleftarrow: Lleftarrow,
	llhard: llhard,
	lltri: lltri,
	Lmidot: Lmidot,
	lmidot: lmidot,
	lmoustache: lmoustache,
	lmoust: lmoust,
	lnap: lnap,
	lnapprox: lnapprox,
	lne: lne,
	lnE: lnE,
	lneq: lneq,
	lneqq: lneqq,
	lnsim: lnsim,
	loang: loang,
	loarr: loarr,
	lobrk: lobrk,
	longleftarrow: longleftarrow,
	LongLeftArrow: LongLeftArrow,
	Longleftarrow: Longleftarrow,
	longleftrightarrow: longleftrightarrow,
	LongLeftRightArrow: LongLeftRightArrow,
	Longleftrightarrow: Longleftrightarrow,
	longmapsto: longmapsto,
	longrightarrow: longrightarrow,
	LongRightArrow: LongRightArrow,
	Longrightarrow: Longrightarrow,
	looparrowleft: looparrowleft,
	looparrowright: looparrowright,
	lopar: lopar,
	Lopf: Lopf,
	lopf: lopf,
	loplus: loplus,
	lotimes: lotimes,
	lowast: lowast,
	lowbar: lowbar,
	LowerLeftArrow: LowerLeftArrow,
	LowerRightArrow: LowerRightArrow,
	loz: loz,
	lozenge: lozenge,
	lozf: lozf,
	lpar: lpar,
	lparlt: lparlt,
	lrarr: lrarr,
	lrcorner: lrcorner,
	lrhar: lrhar,
	lrhard: lrhard,
	lrm: lrm,
	lrtri: lrtri,
	lsaquo: lsaquo,
	lscr: lscr,
	Lscr: Lscr,
	lsh: lsh,
	Lsh: Lsh,
	lsim: lsim,
	lsime: lsime,
	lsimg: lsimg,
	lsqb: lsqb,
	lsquo: lsquo,
	lsquor: lsquor,
	Lstrok: Lstrok,
	lstrok: lstrok,
	ltcc: ltcc,
	ltcir: ltcir,
	lt: lt$2,
	LT: LT$1,
	Lt: Lt,
	ltdot: ltdot,
	lthree: lthree,
	ltimes: ltimes,
	ltlarr: ltlarr,
	ltquest: ltquest,
	ltri: ltri,
	ltrie: ltrie,
	ltrif: ltrif,
	ltrPar: ltrPar,
	lurdshar: lurdshar,
	luruhar: luruhar,
	lvertneqq: lvertneqq,
	lvnE: lvnE,
	macr: macr$1,
	male: male,
	malt: malt,
	maltese: maltese,
	"Map": "⤅",
	map: map,
	mapsto: mapsto,
	mapstodown: mapstodown,
	mapstoleft: mapstoleft,
	mapstoup: mapstoup,
	marker: marker,
	mcomma: mcomma,
	Mcy: Mcy,
	mcy: mcy,
	mdash: mdash,
	mDDot: mDDot,
	measuredangle: measuredangle,
	MediumSpace: MediumSpace,
	Mellintrf: Mellintrf,
	Mfr: Mfr,
	mfr: mfr,
	mho: mho,
	micro: micro$1,
	midast: midast,
	midcir: midcir,
	mid: mid,
	middot: middot$1,
	minusb: minusb,
	minus: minus,
	minusd: minusd,
	minusdu: minusdu,
	MinusPlus: MinusPlus,
	mlcp: mlcp,
	mldr: mldr,
	mnplus: mnplus,
	models: models,
	Mopf: Mopf,
	mopf: mopf,
	mp: mp,
	mscr: mscr,
	Mscr: Mscr,
	mstpos: mstpos,
	Mu: Mu,
	mu: mu,
	multimap: multimap,
	mumap: mumap,
	nabla: nabla,
	Nacute: Nacute,
	nacute: nacute,
	nang: nang,
	nap: nap,
	napE: napE,
	napid: napid,
	napos: napos,
	napprox: napprox,
	natural: natural,
	naturals: naturals,
	natur: natur,
	nbsp: nbsp$1,
	nbump: nbump,
	nbumpe: nbumpe,
	ncap: ncap,
	Ncaron: Ncaron,
	ncaron: ncaron,
	Ncedil: Ncedil,
	ncedil: ncedil,
	ncong: ncong,
	ncongdot: ncongdot,
	ncup: ncup,
	Ncy: Ncy,
	ncy: ncy,
	ndash: ndash,
	nearhk: nearhk,
	nearr: nearr,
	neArr: neArr,
	nearrow: nearrow,
	ne: ne,
	nedot: nedot,
	NegativeMediumSpace: NegativeMediumSpace,
	NegativeThickSpace: NegativeThickSpace,
	NegativeThinSpace: NegativeThinSpace,
	NegativeVeryThinSpace: NegativeVeryThinSpace,
	nequiv: nequiv,
	nesear: nesear,
	nesim: nesim,
	NestedGreaterGreater: NestedGreaterGreater,
	NestedLessLess: NestedLessLess,
	NewLine: NewLine,
	nexist: nexist,
	nexists: nexists,
	Nfr: Nfr,
	nfr: nfr,
	ngE: ngE,
	nge: nge,
	ngeq: ngeq,
	ngeqq: ngeqq,
	ngeqslant: ngeqslant,
	nges: nges,
	nGg: nGg,
	ngsim: ngsim,
	nGt: nGt,
	ngt: ngt,
	ngtr: ngtr,
	nGtv: nGtv,
	nharr: nharr,
	nhArr: nhArr,
	nhpar: nhpar,
	ni: ni,
	nis: nis,
	nisd: nisd,
	niv: niv,
	NJcy: NJcy,
	njcy: njcy,
	nlarr: nlarr,
	nlArr: nlArr,
	nldr: nldr,
	nlE: nlE,
	nle: nle,
	nleftarrow: nleftarrow,
	nLeftarrow: nLeftarrow,
	nleftrightarrow: nleftrightarrow,
	nLeftrightarrow: nLeftrightarrow,
	nleq: nleq,
	nleqq: nleqq,
	nleqslant: nleqslant,
	nles: nles,
	nless: nless,
	nLl: nLl,
	nlsim: nlsim,
	nLt: nLt,
	nlt: nlt,
	nltri: nltri,
	nltrie: nltrie,
	nLtv: nLtv,
	nmid: nmid,
	NoBreak: NoBreak,
	NonBreakingSpace: NonBreakingSpace,
	nopf: nopf,
	Nopf: Nopf,
	Not: Not,
	not: not$1,
	NotCongruent: NotCongruent,
	NotCupCap: NotCupCap,
	NotDoubleVerticalBar: NotDoubleVerticalBar,
	NotElement: NotElement,
	NotEqual: NotEqual,
	NotEqualTilde: NotEqualTilde,
	NotExists: NotExists,
	NotGreater: NotGreater,
	NotGreaterEqual: NotGreaterEqual,
	NotGreaterFullEqual: NotGreaterFullEqual,
	NotGreaterGreater: NotGreaterGreater,
	NotGreaterLess: NotGreaterLess,
	NotGreaterSlantEqual: NotGreaterSlantEqual,
	NotGreaterTilde: NotGreaterTilde,
	NotHumpDownHump: NotHumpDownHump,
	NotHumpEqual: NotHumpEqual,
	notin: notin,
	notindot: notindot,
	notinE: notinE,
	notinva: notinva,
	notinvb: notinvb,
	notinvc: notinvc,
	NotLeftTriangleBar: NotLeftTriangleBar,
	NotLeftTriangle: NotLeftTriangle,
	NotLeftTriangleEqual: NotLeftTriangleEqual,
	NotLess: NotLess,
	NotLessEqual: NotLessEqual,
	NotLessGreater: NotLessGreater,
	NotLessLess: NotLessLess,
	NotLessSlantEqual: NotLessSlantEqual,
	NotLessTilde: NotLessTilde,
	NotNestedGreaterGreater: NotNestedGreaterGreater,
	NotNestedLessLess: NotNestedLessLess,
	notni: notni,
	notniva: notniva,
	notnivb: notnivb,
	notnivc: notnivc,
	NotPrecedes: NotPrecedes,
	NotPrecedesEqual: NotPrecedesEqual,
	NotPrecedesSlantEqual: NotPrecedesSlantEqual,
	NotReverseElement: NotReverseElement,
	NotRightTriangleBar: NotRightTriangleBar,
	NotRightTriangle: NotRightTriangle,
	NotRightTriangleEqual: NotRightTriangleEqual,
	NotSquareSubset: NotSquareSubset,
	NotSquareSubsetEqual: NotSquareSubsetEqual,
	NotSquareSuperset: NotSquareSuperset,
	NotSquareSupersetEqual: NotSquareSupersetEqual,
	NotSubset: NotSubset,
	NotSubsetEqual: NotSubsetEqual,
	NotSucceeds: NotSucceeds,
	NotSucceedsEqual: NotSucceedsEqual,
	NotSucceedsSlantEqual: NotSucceedsSlantEqual,
	NotSucceedsTilde: NotSucceedsTilde,
	NotSuperset: NotSuperset,
	NotSupersetEqual: NotSupersetEqual,
	NotTilde: NotTilde,
	NotTildeEqual: NotTildeEqual,
	NotTildeFullEqual: NotTildeFullEqual,
	NotTildeTilde: NotTildeTilde,
	NotVerticalBar: NotVerticalBar,
	nparallel: nparallel,
	npar: npar,
	nparsl: nparsl,
	npart: npart,
	npolint: npolint,
	npr: npr,
	nprcue: nprcue,
	nprec: nprec,
	npreceq: npreceq,
	npre: npre,
	nrarrc: nrarrc,
	nrarr: nrarr,
	nrArr: nrArr,
	nrarrw: nrarrw,
	nrightarrow: nrightarrow,
	nRightarrow: nRightarrow,
	nrtri: nrtri,
	nrtrie: nrtrie,
	nsc: nsc,
	nsccue: nsccue,
	nsce: nsce,
	Nscr: Nscr,
	nscr: nscr,
	nshortmid: nshortmid,
	nshortparallel: nshortparallel,
	nsim: nsim,
	nsime: nsime,
	nsimeq: nsimeq,
	nsmid: nsmid,
	nspar: nspar,
	nsqsube: nsqsube,
	nsqsupe: nsqsupe,
	nsub: nsub,
	nsubE: nsubE,
	nsube: nsube,
	nsubset: nsubset,
	nsubseteq: nsubseteq,
	nsubseteqq: nsubseteqq,
	nsucc: nsucc,
	nsucceq: nsucceq,
	nsup: nsup,
	nsupE: nsupE,
	nsupe: nsupe,
	nsupset: nsupset,
	nsupseteq: nsupseteq,
	nsupseteqq: nsupseteqq,
	ntgl: ntgl,
	Ntilde: Ntilde$1,
	ntilde: ntilde$1,
	ntlg: ntlg,
	ntriangleleft: ntriangleleft,
	ntrianglelefteq: ntrianglelefteq,
	ntriangleright: ntriangleright,
	ntrianglerighteq: ntrianglerighteq,
	Nu: Nu,
	nu: nu,
	num: num,
	numero: numero,
	numsp: numsp,
	nvap: nvap,
	nvdash: nvdash,
	nvDash: nvDash,
	nVdash: nVdash,
	nVDash: nVDash,
	nvge: nvge,
	nvgt: nvgt,
	nvHarr: nvHarr,
	nvinfin: nvinfin,
	nvlArr: nvlArr,
	nvle: nvle,
	nvlt: nvlt,
	nvltrie: nvltrie,
	nvrArr: nvrArr,
	nvrtrie: nvrtrie,
	nvsim: nvsim,
	nwarhk: nwarhk,
	nwarr: nwarr,
	nwArr: nwArr,
	nwarrow: nwarrow,
	nwnear: nwnear,
	Oacute: Oacute$1,
	oacute: oacute$1,
	oast: oast,
	Ocirc: Ocirc$1,
	ocirc: ocirc$1,
	ocir: ocir,
	Ocy: Ocy,
	ocy: ocy,
	odash: odash,
	Odblac: Odblac,
	odblac: odblac,
	odiv: odiv,
	odot: odot,
	odsold: odsold,
	OElig: OElig,
	oelig: oelig,
	ofcir: ofcir,
	Ofr: Ofr,
	ofr: ofr,
	ogon: ogon,
	Ograve: Ograve$1,
	ograve: ograve$1,
	ogt: ogt,
	ohbar: ohbar,
	ohm: ohm,
	oint: oint,
	olarr: olarr,
	olcir: olcir,
	olcross: olcross,
	oline: oline,
	olt: olt,
	Omacr: Omacr,
	omacr: omacr,
	Omega: Omega,
	omega: omega,
	Omicron: Omicron,
	omicron: omicron,
	omid: omid,
	ominus: ominus,
	Oopf: Oopf,
	oopf: oopf,
	opar: opar,
	OpenCurlyDoubleQuote: OpenCurlyDoubleQuote,
	OpenCurlyQuote: OpenCurlyQuote,
	operp: operp,
	oplus: oplus,
	orarr: orarr,
	Or: Or,
	or: or,
	ord: ord,
	order: order,
	orderof: orderof,
	ordf: ordf$1,
	ordm: ordm$1,
	origof: origof,
	oror: oror,
	orslope: orslope,
	orv: orv,
	oS: oS,
	Oscr: Oscr,
	oscr: oscr,
	Oslash: Oslash$1,
	oslash: oslash$1,
	osol: osol,
	Otilde: Otilde$1,
	otilde: otilde$1,
	otimesas: otimesas,
	Otimes: Otimes,
	otimes: otimes,
	Ouml: Ouml$1,
	ouml: ouml$1,
	ovbar: ovbar,
	OverBar: OverBar,
	OverBrace: OverBrace,
	OverBracket: OverBracket,
	OverParenthesis: OverParenthesis,
	para: para$1,
	parallel: parallel,
	par: par,
	parsim: parsim,
	parsl: parsl,
	part: part,
	PartialD: PartialD,
	Pcy: Pcy,
	pcy: pcy,
	percnt: percnt,
	period: period,
	permil: permil,
	perp: perp,
	pertenk: pertenk,
	Pfr: Pfr,
	pfr: pfr,
	Phi: Phi,
	phi: phi,
	phiv: phiv,
	phmmat: phmmat,
	phone: phone,
	Pi: Pi,
	pi: pi,
	pitchfork: pitchfork,
	piv: piv,
	planck: planck,
	planckh: planckh,
	plankv: plankv,
	plusacir: plusacir,
	plusb: plusb,
	pluscir: pluscir,
	plus: plus,
	plusdo: plusdo,
	plusdu: plusdu,
	pluse: pluse,
	PlusMinus: PlusMinus,
	plusmn: plusmn$1,
	plussim: plussim,
	plustwo: plustwo,
	pm: pm,
	Poincareplane: Poincareplane,
	pointint: pointint,
	popf: popf,
	Popf: Popf,
	pound: pound$1,
	prap: prap,
	Pr: Pr,
	pr: pr,
	prcue: prcue,
	precapprox: precapprox,
	prec: prec,
	preccurlyeq: preccurlyeq,
	Precedes: Precedes,
	PrecedesEqual: PrecedesEqual,
	PrecedesSlantEqual: PrecedesSlantEqual,
	PrecedesTilde: PrecedesTilde,
	preceq: preceq,
	precnapprox: precnapprox,
	precneqq: precneqq,
	precnsim: precnsim,
	pre: pre,
	prE: prE,
	precsim: precsim,
	prime: prime,
	Prime: Prime,
	primes: primes,
	prnap: prnap,
	prnE: prnE,
	prnsim: prnsim,
	prod: prod,
	Product: Product,
	profalar: profalar,
	profline: profline,
	profsurf: profsurf,
	prop: prop,
	Proportional: Proportional,
	Proportion: Proportion,
	propto: propto,
	prsim: prsim,
	prurel: prurel,
	Pscr: Pscr,
	pscr: pscr,
	Psi: Psi,
	psi: psi,
	puncsp: puncsp,
	Qfr: Qfr,
	qfr: qfr,
	qint: qint,
	qopf: qopf,
	Qopf: Qopf,
	qprime: qprime,
	Qscr: Qscr,
	qscr: qscr,
	quaternions: quaternions,
	quatint: quatint,
	quest: quest,
	questeq: questeq,
	quot: quot$2,
	QUOT: QUOT$1,
	rAarr: rAarr,
	race: race,
	Racute: Racute,
	racute: racute,
	radic: radic,
	raemptyv: raemptyv,
	rang: rang,
	Rang: Rang,
	rangd: rangd,
	range: range,
	rangle: rangle,
	raquo: raquo$1,
	rarrap: rarrap,
	rarrb: rarrb,
	rarrbfs: rarrbfs,
	rarrc: rarrc,
	rarr: rarr,
	Rarr: Rarr,
	rArr: rArr,
	rarrfs: rarrfs,
	rarrhk: rarrhk,
	rarrlp: rarrlp,
	rarrpl: rarrpl,
	rarrsim: rarrsim,
	Rarrtl: Rarrtl,
	rarrtl: rarrtl,
	rarrw: rarrw,
	ratail: ratail,
	rAtail: rAtail,
	ratio: ratio,
	rationals: rationals,
	rbarr: rbarr,
	rBarr: rBarr,
	RBarr: RBarr,
	rbbrk: rbbrk,
	rbrace: rbrace,
	rbrack: rbrack,
	rbrke: rbrke,
	rbrksld: rbrksld,
	rbrkslu: rbrkslu,
	Rcaron: Rcaron,
	rcaron: rcaron,
	Rcedil: Rcedil,
	rcedil: rcedil,
	rceil: rceil,
	rcub: rcub,
	Rcy: Rcy,
	rcy: rcy,
	rdca: rdca,
	rdldhar: rdldhar,
	rdquo: rdquo,
	rdquor: rdquor,
	rdsh: rdsh,
	real: real,
	realine: realine,
	realpart: realpart,
	reals: reals,
	Re: Re,
	rect: rect,
	reg: reg$1,
	REG: REG$1,
	ReverseElement: ReverseElement,
	ReverseEquilibrium: ReverseEquilibrium,
	ReverseUpEquilibrium: ReverseUpEquilibrium,
	rfisht: rfisht,
	rfloor: rfloor,
	rfr: rfr,
	Rfr: Rfr,
	rHar: rHar,
	rhard: rhard,
	rharu: rharu,
	rharul: rharul,
	Rho: Rho,
	rho: rho,
	rhov: rhov,
	RightAngleBracket: RightAngleBracket,
	RightArrowBar: RightArrowBar,
	rightarrow: rightarrow,
	RightArrow: RightArrow,
	Rightarrow: Rightarrow,
	RightArrowLeftArrow: RightArrowLeftArrow,
	rightarrowtail: rightarrowtail,
	RightCeiling: RightCeiling,
	RightDoubleBracket: RightDoubleBracket,
	RightDownTeeVector: RightDownTeeVector,
	RightDownVectorBar: RightDownVectorBar,
	RightDownVector: RightDownVector,
	RightFloor: RightFloor,
	rightharpoondown: rightharpoondown,
	rightharpoonup: rightharpoonup,
	rightleftarrows: rightleftarrows,
	rightleftharpoons: rightleftharpoons,
	rightrightarrows: rightrightarrows,
	rightsquigarrow: rightsquigarrow,
	RightTeeArrow: RightTeeArrow,
	RightTee: RightTee,
	RightTeeVector: RightTeeVector,
	rightthreetimes: rightthreetimes,
	RightTriangleBar: RightTriangleBar,
	RightTriangle: RightTriangle,
	RightTriangleEqual: RightTriangleEqual,
	RightUpDownVector: RightUpDownVector,
	RightUpTeeVector: RightUpTeeVector,
	RightUpVectorBar: RightUpVectorBar,
	RightUpVector: RightUpVector,
	RightVectorBar: RightVectorBar,
	RightVector: RightVector,
	ring: ring,
	risingdotseq: risingdotseq,
	rlarr: rlarr,
	rlhar: rlhar,
	rlm: rlm,
	rmoustache: rmoustache,
	rmoust: rmoust,
	rnmid: rnmid,
	roang: roang,
	roarr: roarr,
	robrk: robrk,
	ropar: ropar,
	ropf: ropf,
	Ropf: Ropf,
	roplus: roplus,
	rotimes: rotimes,
	RoundImplies: RoundImplies,
	rpar: rpar,
	rpargt: rpargt,
	rppolint: rppolint,
	rrarr: rrarr,
	Rrightarrow: Rrightarrow,
	rsaquo: rsaquo,
	rscr: rscr,
	Rscr: Rscr,
	rsh: rsh,
	Rsh: Rsh,
	rsqb: rsqb,
	rsquo: rsquo,
	rsquor: rsquor,
	rthree: rthree,
	rtimes: rtimes,
	rtri: rtri,
	rtrie: rtrie,
	rtrif: rtrif,
	rtriltri: rtriltri,
	RuleDelayed: RuleDelayed,
	ruluhar: ruluhar,
	rx: rx,
	Sacute: Sacute,
	sacute: sacute,
	sbquo: sbquo,
	scap: scap,
	Scaron: Scaron,
	scaron: scaron,
	Sc: Sc,
	sc: sc,
	sccue: sccue,
	sce: sce,
	scE: scE,
	Scedil: Scedil,
	scedil: scedil,
	Scirc: Scirc,
	scirc: scirc,
	scnap: scnap,
	scnE: scnE,
	scnsim: scnsim,
	scpolint: scpolint,
	scsim: scsim,
	Scy: Scy,
	scy: scy,
	sdotb: sdotb,
	sdot: sdot,
	sdote: sdote,
	searhk: searhk,
	searr: searr,
	seArr: seArr,
	searrow: searrow,
	sect: sect$1,
	semi: semi,
	seswar: seswar,
	setminus: setminus,
	setmn: setmn,
	sext: sext,
	Sfr: Sfr,
	sfr: sfr,
	sfrown: sfrown,
	sharp: sharp,
	SHCHcy: SHCHcy,
	shchcy: shchcy,
	SHcy: SHcy,
	shcy: shcy,
	ShortDownArrow: ShortDownArrow,
	ShortLeftArrow: ShortLeftArrow,
	shortmid: shortmid,
	shortparallel: shortparallel,
	ShortRightArrow: ShortRightArrow,
	ShortUpArrow: ShortUpArrow,
	shy: shy$1,
	Sigma: Sigma,
	sigma: sigma,
	sigmaf: sigmaf,
	sigmav: sigmav,
	sim: sim,
	simdot: simdot,
	sime: sime,
	simeq: simeq,
	simg: simg,
	simgE: simgE,
	siml: siml,
	simlE: simlE,
	simne: simne,
	simplus: simplus,
	simrarr: simrarr,
	slarr: slarr,
	SmallCircle: SmallCircle,
	smallsetminus: smallsetminus,
	smashp: smashp,
	smeparsl: smeparsl,
	smid: smid,
	smile: smile,
	smt: smt,
	smte: smte,
	smtes: smtes,
	SOFTcy: SOFTcy,
	softcy: softcy,
	solbar: solbar,
	solb: solb,
	sol: sol,
	Sopf: Sopf,
	sopf: sopf,
	spades: spades,
	spadesuit: spadesuit,
	spar: spar,
	sqcap: sqcap,
	sqcaps: sqcaps,
	sqcup: sqcup,
	sqcups: sqcups,
	Sqrt: Sqrt,
	sqsub: sqsub,
	sqsube: sqsube,
	sqsubset: sqsubset,
	sqsubseteq: sqsubseteq,
	sqsup: sqsup,
	sqsupe: sqsupe,
	sqsupset: sqsupset,
	sqsupseteq: sqsupseteq,
	square: square,
	Square: Square,
	SquareIntersection: SquareIntersection,
	SquareSubset: SquareSubset,
	SquareSubsetEqual: SquareSubsetEqual,
	SquareSuperset: SquareSuperset,
	SquareSupersetEqual: SquareSupersetEqual,
	SquareUnion: SquareUnion,
	squarf: squarf,
	squ: squ,
	squf: squf,
	srarr: srarr,
	Sscr: Sscr,
	sscr: sscr,
	ssetmn: ssetmn,
	ssmile: ssmile,
	sstarf: sstarf,
	Star: Star,
	star: star,
	starf: starf,
	straightepsilon: straightepsilon,
	straightphi: straightphi,
	strns: strns,
	sub: sub,
	Sub: Sub,
	subdot: subdot,
	subE: subE,
	sube: sube,
	subedot: subedot,
	submult: submult,
	subnE: subnE,
	subne: subne,
	subplus: subplus,
	subrarr: subrarr,
	subset: subset,
	Subset: Subset,
	subseteq: subseteq,
	subseteqq: subseteqq,
	SubsetEqual: SubsetEqual,
	subsetneq: subsetneq,
	subsetneqq: subsetneqq,
	subsim: subsim,
	subsub: subsub,
	subsup: subsup,
	succapprox: succapprox,
	succ: succ,
	succcurlyeq: succcurlyeq,
	Succeeds: Succeeds,
	SucceedsEqual: SucceedsEqual,
	SucceedsSlantEqual: SucceedsSlantEqual,
	SucceedsTilde: SucceedsTilde,
	succeq: succeq,
	succnapprox: succnapprox,
	succneqq: succneqq,
	succnsim: succnsim,
	succsim: succsim,
	SuchThat: SuchThat,
	sum: sum,
	Sum: Sum,
	sung: sung,
	sup1: sup1$1,
	sup2: sup2$1,
	sup3: sup3$1,
	sup: sup,
	Sup: Sup,
	supdot: supdot,
	supdsub: supdsub,
	supE: supE,
	supe: supe,
	supedot: supedot,
	Superset: Superset,
	SupersetEqual: SupersetEqual,
	suphsol: suphsol,
	suphsub: suphsub,
	suplarr: suplarr,
	supmult: supmult,
	supnE: supnE,
	supne: supne,
	supplus: supplus,
	supset: supset,
	Supset: Supset,
	supseteq: supseteq,
	supseteqq: supseteqq,
	supsetneq: supsetneq,
	supsetneqq: supsetneqq,
	supsim: supsim,
	supsub: supsub,
	supsup: supsup,
	swarhk: swarhk,
	swarr: swarr,
	swArr: swArr,
	swarrow: swarrow,
	swnwar: swnwar,
	szlig: szlig$1,
	Tab: Tab,
	target: target,
	Tau: Tau,
	tau: tau,
	tbrk: tbrk,
	Tcaron: Tcaron,
	tcaron: tcaron,
	Tcedil: Tcedil,
	tcedil: tcedil,
	Tcy: Tcy,
	tcy: tcy,
	tdot: tdot,
	telrec: telrec,
	Tfr: Tfr,
	tfr: tfr,
	there4: there4,
	therefore: therefore,
	Therefore: Therefore,
	Theta: Theta,
	theta: theta,
	thetasym: thetasym,
	thetav: thetav,
	thickapprox: thickapprox,
	thicksim: thicksim,
	ThickSpace: ThickSpace,
	ThinSpace: ThinSpace,
	thinsp: thinsp,
	thkap: thkap,
	thksim: thksim,
	THORN: THORN$1,
	thorn: thorn$1,
	tilde: tilde,
	Tilde: Tilde,
	TildeEqual: TildeEqual,
	TildeFullEqual: TildeFullEqual,
	TildeTilde: TildeTilde,
	timesbar: timesbar,
	timesb: timesb,
	times: times$1,
	timesd: timesd,
	tint: tint,
	toea: toea,
	topbot: topbot,
	topcir: topcir,
	top: top,
	Topf: Topf,
	topf: topf,
	topfork: topfork,
	tosa: tosa,
	tprime: tprime,
	trade: trade,
	TRADE: TRADE,
	triangle: triangle,
	triangledown: triangledown,
	triangleleft: triangleleft,
	trianglelefteq: trianglelefteq,
	triangleq: triangleq,
	triangleright: triangleright,
	trianglerighteq: trianglerighteq,
	tridot: tridot,
	trie: trie,
	triminus: triminus,
	TripleDot: TripleDot,
	triplus: triplus,
	trisb: trisb,
	tritime: tritime,
	trpezium: trpezium,
	Tscr: Tscr,
	tscr: tscr,
	TScy: TScy,
	tscy: tscy,
	TSHcy: TSHcy,
	tshcy: tshcy,
	Tstrok: Tstrok,
	tstrok: tstrok,
	twixt: twixt,
	twoheadleftarrow: twoheadleftarrow,
	twoheadrightarrow: twoheadrightarrow,
	Uacute: Uacute$1,
	uacute: uacute$1,
	uarr: uarr,
	Uarr: Uarr,
	uArr: uArr,
	Uarrocir: Uarrocir,
	Ubrcy: Ubrcy,
	ubrcy: ubrcy,
	Ubreve: Ubreve,
	ubreve: ubreve,
	Ucirc: Ucirc$1,
	ucirc: ucirc$1,
	Ucy: Ucy,
	ucy: ucy,
	udarr: udarr,
	Udblac: Udblac,
	udblac: udblac,
	udhar: udhar,
	ufisht: ufisht,
	Ufr: Ufr,
	ufr: ufr,
	Ugrave: Ugrave$1,
	ugrave: ugrave$1,
	uHar: uHar,
	uharl: uharl,
	uharr: uharr,
	uhblk: uhblk,
	ulcorn: ulcorn,
	ulcorner: ulcorner,
	ulcrop: ulcrop,
	ultri: ultri,
	Umacr: Umacr,
	umacr: umacr,
	uml: uml$1,
	UnderBar: UnderBar,
	UnderBrace: UnderBrace,
	UnderBracket: UnderBracket,
	UnderParenthesis: UnderParenthesis,
	Union: Union,
	UnionPlus: UnionPlus,
	Uogon: Uogon,
	uogon: uogon,
	Uopf: Uopf,
	uopf: uopf,
	UpArrowBar: UpArrowBar,
	uparrow: uparrow,
	UpArrow: UpArrow,
	Uparrow: Uparrow,
	UpArrowDownArrow: UpArrowDownArrow,
	updownarrow: updownarrow,
	UpDownArrow: UpDownArrow,
	Updownarrow: Updownarrow,
	UpEquilibrium: UpEquilibrium,
	upharpoonleft: upharpoonleft,
	upharpoonright: upharpoonright,
	uplus: uplus,
	UpperLeftArrow: UpperLeftArrow,
	UpperRightArrow: UpperRightArrow,
	upsi: upsi,
	Upsi: Upsi,
	upsih: upsih,
	Upsilon: Upsilon,
	upsilon: upsilon,
	UpTeeArrow: UpTeeArrow,
	UpTee: UpTee,
	upuparrows: upuparrows,
	urcorn: urcorn,
	urcorner: urcorner,
	urcrop: urcrop,
	Uring: Uring,
	uring: uring,
	urtri: urtri,
	Uscr: Uscr,
	uscr: uscr,
	utdot: utdot,
	Utilde: Utilde,
	utilde: utilde,
	utri: utri,
	utrif: utrif,
	uuarr: uuarr,
	Uuml: Uuml$1,
	uuml: uuml$1,
	uwangle: uwangle,
	vangrt: vangrt,
	varepsilon: varepsilon,
	varkappa: varkappa,
	varnothing: varnothing,
	varphi: varphi,
	varpi: varpi,
	varpropto: varpropto,
	varr: varr,
	vArr: vArr,
	varrho: varrho,
	varsigma: varsigma,
	varsubsetneq: varsubsetneq,
	varsubsetneqq: varsubsetneqq,
	varsupsetneq: varsupsetneq,
	varsupsetneqq: varsupsetneqq,
	vartheta: vartheta,
	vartriangleleft: vartriangleleft,
	vartriangleright: vartriangleright,
	vBar: vBar,
	Vbar: Vbar,
	vBarv: vBarv,
	Vcy: Vcy,
	vcy: vcy,
	vdash: vdash,
	vDash: vDash,
	Vdash: Vdash,
	VDash: VDash,
	Vdashl: Vdashl,
	veebar: veebar,
	vee: vee,
	Vee: Vee,
	veeeq: veeeq,
	vellip: vellip,
	verbar: verbar,
	Verbar: Verbar,
	vert: vert,
	Vert: Vert,
	VerticalBar: VerticalBar,
	VerticalLine: VerticalLine,
	VerticalSeparator: VerticalSeparator,
	VerticalTilde: VerticalTilde,
	VeryThinSpace: VeryThinSpace,
	Vfr: Vfr,
	vfr: vfr,
	vltri: vltri,
	vnsub: vnsub,
	vnsup: vnsup,
	Vopf: Vopf,
	vopf: vopf,
	vprop: vprop,
	vrtri: vrtri,
	Vscr: Vscr,
	vscr: vscr,
	vsubnE: vsubnE,
	vsubne: vsubne,
	vsupnE: vsupnE,
	vsupne: vsupne,
	Vvdash: Vvdash,
	vzigzag: vzigzag,
	Wcirc: Wcirc,
	wcirc: wcirc,
	wedbar: wedbar,
	wedge: wedge,
	Wedge: Wedge,
	wedgeq: wedgeq,
	weierp: weierp,
	Wfr: Wfr,
	wfr: wfr,
	Wopf: Wopf,
	wopf: wopf,
	wp: wp,
	wr: wr,
	wreath: wreath,
	Wscr: Wscr,
	wscr: wscr,
	xcap: xcap,
	xcirc: xcirc,
	xcup: xcup,
	xdtri: xdtri,
	Xfr: Xfr,
	xfr: xfr,
	xharr: xharr,
	xhArr: xhArr,
	Xi: Xi,
	xi: xi,
	xlarr: xlarr,
	xlArr: xlArr,
	xmap: xmap,
	xnis: xnis,
	xodot: xodot,
	Xopf: Xopf,
	xopf: xopf,
	xoplus: xoplus,
	xotime: xotime,
	xrarr: xrarr,
	xrArr: xrArr,
	Xscr: Xscr,
	xscr: xscr,
	xsqcup: xsqcup,
	xuplus: xuplus,
	xutri: xutri,
	xvee: xvee,
	xwedge: xwedge,
	Yacute: Yacute$1,
	yacute: yacute$1,
	YAcy: YAcy,
	yacy: yacy,
	Ycirc: Ycirc,
	ycirc: ycirc,
	Ycy: Ycy,
	ycy: ycy,
	yen: yen$1,
	Yfr: Yfr,
	yfr: yfr,
	YIcy: YIcy,
	yicy: yicy,
	Yopf: Yopf,
	yopf: yopf,
	Yscr: Yscr,
	yscr: yscr,
	YUcy: YUcy,
	yucy: yucy,
	yuml: yuml$1,
	Yuml: Yuml,
	Zacute: Zacute,
	zacute: zacute,
	Zcaron: Zcaron,
	zcaron: zcaron,
	Zcy: Zcy,
	zcy: zcy,
	Zdot: Zdot,
	zdot: zdot,
	zeetrf: zeetrf,
	ZeroWidthSpace: ZeroWidthSpace,
	Zeta: Zeta,
	zeta: zeta,
	zfr: zfr,
	Zfr: Zfr,
	ZHcy: ZHcy,
	zhcy: zhcy,
	zigrarr: zigrarr,
	zopf: zopf,
	Zopf: Zopf,
	Zscr: Zscr,
	zscr: zscr,
	zwj: zwj,
	zwnj: zwnj
};

var Aacute = "Á";
var aacute = "á";
var Acirc = "Â";
var acirc = "â";
var acute = "´";
var AElig = "Æ";
var aelig = "æ";
var Agrave = "À";
var agrave = "à";
var amp$1 = "&";
var AMP = "&";
var Aring = "Å";
var aring = "å";
var Atilde = "Ã";
var atilde = "ã";
var Auml = "Ä";
var auml = "ä";
var brvbar = "¦";
var Ccedil = "Ç";
var ccedil = "ç";
var cedil = "¸";
var cent = "¢";
var copy = "©";
var COPY = "©";
var curren = "¤";
var deg = "°";
var divide = "÷";
var Eacute = "É";
var eacute = "é";
var Ecirc = "Ê";
var ecirc = "ê";
var Egrave = "È";
var egrave = "è";
var ETH = "Ð";
var eth = "ð";
var Euml = "Ë";
var euml = "ë";
var frac12 = "½";
var frac14 = "¼";
var frac34 = "¾";
var gt$1 = ">";
var GT = ">";
var Iacute = "Í";
var iacute = "í";
var Icirc = "Î";
var icirc = "î";
var iexcl = "¡";
var Igrave = "Ì";
var igrave = "ì";
var iquest = "¿";
var Iuml = "Ï";
var iuml = "ï";
var laquo = "«";
var lt$1 = "<";
var LT = "<";
var macr = "¯";
var micro = "µ";
var middot = "·";
var nbsp = " ";
var not = "¬";
var Ntilde = "Ñ";
var ntilde = "ñ";
var Oacute = "Ó";
var oacute = "ó";
var Ocirc = "Ô";
var ocirc = "ô";
var Ograve = "Ò";
var ograve = "ò";
var ordf = "ª";
var ordm = "º";
var Oslash = "Ø";
var oslash = "ø";
var Otilde = "Õ";
var otilde = "õ";
var Ouml = "Ö";
var ouml = "ö";
var para = "¶";
var plusmn = "±";
var pound = "£";
var quot$1 = "\"";
var QUOT = "\"";
var raquo = "»";
var reg = "®";
var REG = "®";
var sect = "§";
var shy = "­";
var sup1 = "¹";
var sup2 = "²";
var sup3 = "³";
var szlig = "ß";
var THORN = "Þ";
var thorn = "þ";
var times = "×";
var Uacute = "Ú";
var uacute = "ú";
var Ucirc = "Û";
var ucirc = "û";
var Ugrave = "Ù";
var ugrave = "ù";
var uml = "¨";
var Uuml = "Ü";
var uuml = "ü";
var Yacute = "Ý";
var yacute = "ý";
var yen = "¥";
var yuml = "ÿ";
var require$$1 = {
	Aacute: Aacute,
	aacute: aacute,
	Acirc: Acirc,
	acirc: acirc,
	acute: acute,
	AElig: AElig,
	aelig: aelig,
	Agrave: Agrave,
	agrave: agrave,
	amp: amp$1,
	AMP: AMP,
	Aring: Aring,
	aring: aring,
	Atilde: Atilde,
	atilde: atilde,
	Auml: Auml,
	auml: auml,
	brvbar: brvbar,
	Ccedil: Ccedil,
	ccedil: ccedil,
	cedil: cedil,
	cent: cent,
	copy: copy,
	COPY: COPY,
	curren: curren,
	deg: deg,
	divide: divide,
	Eacute: Eacute,
	eacute: eacute,
	Ecirc: Ecirc,
	ecirc: ecirc,
	Egrave: Egrave,
	egrave: egrave,
	ETH: ETH,
	eth: eth,
	Euml: Euml,
	euml: euml,
	frac12: frac12,
	frac14: frac14,
	frac34: frac34,
	gt: gt$1,
	GT: GT,
	Iacute: Iacute,
	iacute: iacute,
	Icirc: Icirc,
	icirc: icirc,
	iexcl: iexcl,
	Igrave: Igrave,
	igrave: igrave,
	iquest: iquest,
	Iuml: Iuml,
	iuml: iuml,
	laquo: laquo,
	lt: lt$1,
	LT: LT,
	macr: macr,
	micro: micro,
	middot: middot,
	nbsp: nbsp,
	not: not,
	Ntilde: Ntilde,
	ntilde: ntilde,
	Oacute: Oacute,
	oacute: oacute,
	Ocirc: Ocirc,
	ocirc: ocirc,
	Ograve: Ograve,
	ograve: ograve,
	ordf: ordf,
	ordm: ordm,
	Oslash: Oslash,
	oslash: oslash,
	Otilde: Otilde,
	otilde: otilde,
	Ouml: Ouml,
	ouml: ouml,
	para: para,
	plusmn: plusmn,
	pound: pound,
	quot: quot$1,
	QUOT: QUOT,
	raquo: raquo,
	reg: reg,
	REG: REG,
	sect: sect,
	shy: shy,
	sup1: sup1,
	sup2: sup2,
	sup3: sup3,
	szlig: szlig,
	THORN: THORN,
	thorn: thorn,
	times: times,
	Uacute: Uacute,
	uacute: uacute,
	Ucirc: Ucirc,
	ucirc: ucirc,
	Ugrave: Ugrave,
	ugrave: ugrave,
	uml: uml,
	Uuml: Uuml,
	uuml: uuml,
	Yacute: Yacute,
	yacute: yacute,
	yen: yen,
	yuml: yuml
};

var amp = "&";
var apos = "'";
var gt = ">";
var lt = "<";
var quot = "\"";
var require$$0$1 = {
	amp: amp,
	apos: apos,
	gt: gt,
	lt: lt,
	quot: quot
};

var decode_codepoint = {};

var require$$0 = {
	"0": 65533,
	"128": 8364,
	"130": 8218,
	"131": 402,
	"132": 8222,
	"133": 8230,
	"134": 8224,
	"135": 8225,
	"136": 710,
	"137": 8240,
	"138": 352,
	"139": 8249,
	"140": 338,
	"142": 381,
	"145": 8216,
	"146": 8217,
	"147": 8220,
	"148": 8221,
	"149": 8226,
	"150": 8211,
	"151": 8212,
	"152": 732,
	"153": 8482,
	"154": 353,
	"155": 8250,
	"156": 339,
	"158": 382,
	"159": 376
};

var __importDefault$2 = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(decode_codepoint, "__esModule", { value: true });
var decode_json_1 = __importDefault$2(require$$0);
// Adapted from https://github.com/mathiasbynens/he/blob/master/src/he.js#L94-L119
var fromCodePoint$2 = 
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
String.fromCodePoint ||
    function (codePoint) {
        var output = "";
        if (codePoint > 0xffff) {
            codePoint -= 0x10000;
            output += String.fromCharCode(((codePoint >>> 10) & 0x3ff) | 0xd800);
            codePoint = 0xdc00 | (codePoint & 0x3ff);
        }
        output += String.fromCharCode(codePoint);
        return output;
    };
function decodeCodePoint(codePoint) {
    if ((codePoint >= 0xd800 && codePoint <= 0xdfff) || codePoint > 0x10ffff) {
        return "\uFFFD";
    }
    if (codePoint in decode_json_1.default) {
        codePoint = decode_json_1.default[codePoint];
    }
    return fromCodePoint$2(codePoint);
}
decode_codepoint.default = decodeCodePoint;

var __importDefault$1 = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(decode, "__esModule", { value: true });
decode.decodeHTML = decode.decodeHTMLStrict = decode.decodeXML = void 0;
var entities_json_1$1 = __importDefault$1(require$$1$1);
var legacy_json_1 = __importDefault$1(require$$1);
var xml_json_1$1 = __importDefault$1(require$$0$1);
var decode_codepoint_1 = __importDefault$1(decode_codepoint);
var strictEntityRe = /&(?:[a-zA-Z0-9]+|#[xX][\da-fA-F]+|#\d+);/g;
decode.decodeXML = getStrictDecoder(xml_json_1$1.default);
decode.decodeHTMLStrict = getStrictDecoder(entities_json_1$1.default);
function getStrictDecoder(map) {
    var replace = getReplacer(map);
    return function (str) { return String(str).replace(strictEntityRe, replace); };
}
var sorter = function (a, b) { return (a < b ? 1 : -1); };
decode.decodeHTML = (function () {
    var legacy = Object.keys(legacy_json_1.default).sort(sorter);
    var keys = Object.keys(entities_json_1$1.default).sort(sorter);
    for (var i = 0, j = 0; i < keys.length; i++) {
        if (legacy[j] === keys[i]) {
            keys[i] += ";?";
            j++;
        }
        else {
            keys[i] += ";";
        }
    }
    var re = new RegExp("&(?:" + keys.join("|") + "|#[xX][\\da-fA-F]+;?|#\\d+;?)", "g");
    var replace = getReplacer(entities_json_1$1.default);
    function replacer(str) {
        if (str.substr(-1) !== ";")
            str += ";";
        return replace(str);
    }
    // TODO consider creating a merged map
    return function (str) { return String(str).replace(re, replacer); };
})();
function getReplacer(map) {
    return function replace(str) {
        if (str.charAt(1) === "#") {
            var secondChar = str.charAt(2);
            if (secondChar === "X" || secondChar === "x") {
                return decode_codepoint_1.default(parseInt(str.substr(3), 16));
            }
            return decode_codepoint_1.default(parseInt(str.substr(2), 10));
        }
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        return map[str.slice(1, -1)] || str;
    };
}

var encode = {};

var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(encode, "__esModule", { value: true });
encode.escapeUTF8 = encode.escape = encode.encodeNonAsciiHTML = encode.encodeHTML = encode.encodeXML = void 0;
var xml_json_1 = __importDefault(require$$0$1);
var inverseXML = getInverseObj(xml_json_1.default);
var xmlReplacer = getInverseReplacer(inverseXML);
/**
 * Encodes all non-ASCII characters, as well as characters not valid in XML
 * documents using XML entities.
 *
 * If a character has no equivalent entity, a
 * numeric hexadecimal reference (eg. `&#xfc;`) will be used.
 */
encode.encodeXML = getASCIIEncoder(inverseXML);
var entities_json_1 = __importDefault(require$$1$1);
var inverseHTML = getInverseObj(entities_json_1.default);
var htmlReplacer = getInverseReplacer(inverseHTML);
/**
 * Encodes all entities and non-ASCII characters in the input.
 *
 * This includes characters that are valid ASCII characters in HTML documents.
 * For example `#` will be encoded as `&num;`. To get a more compact output,
 * consider using the `encodeNonAsciiHTML` function.
 *
 * If a character has no equivalent entity, a
 * numeric hexadecimal reference (eg. `&#xfc;`) will be used.
 */
encode.encodeHTML = getInverse(inverseHTML, htmlReplacer);
/**
 * Encodes all non-ASCII characters, as well as characters not valid in HTML
 * documents using HTML entities.
 *
 * If a character has no equivalent entity, a
 * numeric hexadecimal reference (eg. `&#xfc;`) will be used.
 */
encode.encodeNonAsciiHTML = getASCIIEncoder(inverseHTML);
function getInverseObj(obj) {
    return Object.keys(obj)
        .sort()
        .reduce(function (inverse, name) {
        inverse[obj[name]] = "&" + name + ";";
        return inverse;
    }, {});
}
function getInverseReplacer(inverse) {
    var single = [];
    var multiple = [];
    for (var _i = 0, _a = Object.keys(inverse); _i < _a.length; _i++) {
        var k = _a[_i];
        if (k.length === 1) {
            // Add value to single array
            single.push("\\" + k);
        }
        else {
            // Add value to multiple array
            multiple.push(k);
        }
    }
    // Add ranges to single characters.
    single.sort();
    for (var start = 0; start < single.length - 1; start++) {
        // Find the end of a run of characters
        var end = start;
        while (end < single.length - 1 &&
            single[end].charCodeAt(1) + 1 === single[end + 1].charCodeAt(1)) {
            end += 1;
        }
        var count = 1 + end - start;
        // We want to replace at least three characters
        if (count < 3)
            continue;
        single.splice(start, count, single[start] + "-" + single[end]);
    }
    multiple.unshift("[" + single.join("") + "]");
    return new RegExp(multiple.join("|"), "g");
}
// /[^\0-\x7F]/gu
var reNonASCII = /(?:[\x80-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g;
var getCodePoint = 
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
String.prototype.codePointAt != null
    ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        function (str) { return str.codePointAt(0); }
    : // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        function (c) {
            return (c.charCodeAt(0) - 0xd800) * 0x400 +
                c.charCodeAt(1) -
                0xdc00 +
                0x10000;
        };
function singleCharReplacer(c) {
    return "&#x" + (c.length > 1 ? getCodePoint(c) : c.charCodeAt(0))
        .toString(16)
        .toUpperCase() + ";";
}
function getInverse(inverse, re) {
    return function (data) {
        return data
            .replace(re, function (name) { return inverse[name]; })
            .replace(reNonASCII, singleCharReplacer);
    };
}
var reEscapeChars = new RegExp(xmlReplacer.source + "|" + reNonASCII.source, "g");
/**
 * Encodes all non-ASCII characters, as well as characters not valid in XML
 * documents using numeric hexadecimal reference (eg. `&#xfc;`).
 *
 * Have a look at `escapeUTF8` if you want a more concise output at the expense
 * of reduced transportability.
 *
 * @param data String to escape.
 */
function escape(data) {
    return data.replace(reEscapeChars, singleCharReplacer);
}
encode.escape = escape;
/**
 * Encodes all characters not valid in XML documents using numeric hexadecimal
 * reference (eg. `&#xfc;`).
 *
 * Note that the output will be character-set dependent.
 *
 * @param data String to escape.
 */
function escapeUTF8(data) {
    return data.replace(xmlReplacer, singleCharReplacer);
}
encode.escapeUTF8 = escapeUTF8;
function getASCIIEncoder(obj) {
    return function (data) {
        return data.replace(reEscapeChars, function (c) { return obj[c] || singleCharReplacer(c); });
    };
}

(function (exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeXMLStrict = exports.decodeHTML5Strict = exports.decodeHTML4Strict = exports.decodeHTML5 = exports.decodeHTML4 = exports.decodeHTMLStrict = exports.decodeHTML = exports.decodeXML = exports.encodeHTML5 = exports.encodeHTML4 = exports.escapeUTF8 = exports.escape = exports.encodeNonAsciiHTML = exports.encodeHTML = exports.encodeXML = exports.encode = exports.decodeStrict = exports.decode = void 0;
var decode_1 = decode;
var encode_1 = encode;
/**
 * Decodes a string with entities.
 *
 * @param data String to decode.
 * @param level Optional level to decode at. 0 = XML, 1 = HTML. Default is 0.
 * @deprecated Use `decodeXML` or `decodeHTML` directly.
 */
function decode$1(data, level) {
    return (!level || level <= 0 ? decode_1.decodeXML : decode_1.decodeHTML)(data);
}
exports.decode = decode$1;
/**
 * Decodes a string with entities. Does not allow missing trailing semicolons for entities.
 *
 * @param data String to decode.
 * @param level Optional level to decode at. 0 = XML, 1 = HTML. Default is 0.
 * @deprecated Use `decodeHTMLStrict` or `decodeXML` directly.
 */
function decodeStrict(data, level) {
    return (!level || level <= 0 ? decode_1.decodeXML : decode_1.decodeHTMLStrict)(data);
}
exports.decodeStrict = decodeStrict;
/**
 * Encodes a string with entities.
 *
 * @param data String to encode.
 * @param level Optional level to encode at. 0 = XML, 1 = HTML. Default is 0.
 * @deprecated Use `encodeHTML`, `encodeXML` or `encodeNonAsciiHTML` directly.
 */
function encode$1(data, level) {
    return (!level || level <= 0 ? encode_1.encodeXML : encode_1.encodeHTML)(data);
}
exports.encode = encode$1;
var encode_2 = encode;
Object.defineProperty(exports, "encodeXML", { enumerable: true, get: function () { return encode_2.encodeXML; } });
Object.defineProperty(exports, "encodeHTML", { enumerable: true, get: function () { return encode_2.encodeHTML; } });
Object.defineProperty(exports, "encodeNonAsciiHTML", { enumerable: true, get: function () { return encode_2.encodeNonAsciiHTML; } });
Object.defineProperty(exports, "escape", { enumerable: true, get: function () { return encode_2.escape; } });
Object.defineProperty(exports, "escapeUTF8", { enumerable: true, get: function () { return encode_2.escapeUTF8; } });
// Legacy aliases (deprecated)
Object.defineProperty(exports, "encodeHTML4", { enumerable: true, get: function () { return encode_2.encodeHTML; } });
Object.defineProperty(exports, "encodeHTML5", { enumerable: true, get: function () { return encode_2.encodeHTML; } });
var decode_2 = decode;
Object.defineProperty(exports, "decodeXML", { enumerable: true, get: function () { return decode_2.decodeXML; } });
Object.defineProperty(exports, "decodeHTML", { enumerable: true, get: function () { return decode_2.decodeHTML; } });
Object.defineProperty(exports, "decodeHTMLStrict", { enumerable: true, get: function () { return decode_2.decodeHTMLStrict; } });
// Legacy aliases (deprecated)
Object.defineProperty(exports, "decodeHTML4", { enumerable: true, get: function () { return decode_2.decodeHTML; } });
Object.defineProperty(exports, "decodeHTML5", { enumerable: true, get: function () { return decode_2.decodeHTML; } });
Object.defineProperty(exports, "decodeHTML4Strict", { enumerable: true, get: function () { return decode_2.decodeHTMLStrict; } });
Object.defineProperty(exports, "decodeHTML5Strict", { enumerable: true, get: function () { return decode_2.decodeHTMLStrict; } });
Object.defineProperty(exports, "decodeXMLStrict", { enumerable: true, get: function () { return decode_2.decodeXML; } });
}(lib));

var ENTITY = '&(?:#x[a-f0-9]{1,6}|#[0-9]{1,7}|[a-z][a-z0-9]{1,31});';
var C_BACKSLASH$1 = 92;
var reBackslashOrAmp = /[\\&]/;
var ESCAPABLE = '[!"#$%&\'()*+,./:;<=>?@[\\\\\\]^_`{|}~-]';
var reEntityOrEscapedChar = new RegExp("\\\\" + ESCAPABLE + "|" + ENTITY, 'gi');
var XMLSPECIAL = '[&<>"]';
var reXmlSpecial = new RegExp(XMLSPECIAL, 'g');
var unescapeChar = function (s) {
    if (s.charCodeAt(0) === C_BACKSLASH$1) {
        return s.charAt(1);
    }
    return lib.decodeHTML(s);
};
// Replace entities and backslash escapes with literal characters.
function unescapeString(s) {
    if (reBackslashOrAmp.test(s)) {
        return s.replace(reEntityOrEscapedChar, unescapeChar);
    }
    return s;
}
function normalizeURI(uri) {
    try {
        return encode_1(uri);
    }
    catch (err) {
        return uri;
    }
}
function replaceUnsafeChar(s) {
    switch (s) {
        case '&':
            return '&amp;';
        case '<':
            return '&lt;';
        case '>':
            return '&gt;';
        case '"':
            return '&quot;';
        default:
            return s;
    }
}
function escapeXml(s) {
    if (reXmlSpecial.test(s)) {
        return s.replace(reXmlSpecial, replaceUnsafeChar);
    }
    return s;
}
function repeat(str, count) {
    var arr = [];
    for (var i = 0; i < count; i++) {
        arr.push(str);
    }
    return arr.join('');
}
function isEmpty(str) {
    if (!str) {
        return true;
    }
    return !/[^ \t]+/.test(str);
}

var NodeWalker = /** @class */ (function () {
    function NodeWalker(root) {
        this.current = root;
        this.root = root;
        this.entering = true;
    }
    NodeWalker.prototype.next = function () {
        var cur = this.current;
        var entering = this.entering;
        if (cur === null) {
            return null;
        }
        var container = isContainer(cur);
        if (entering && container) {
            if (cur.firstChild) {
                this.current = cur.firstChild;
                this.entering = true;
            }
            else {
                // stay on node but exit
                this.entering = false;
            }
        }
        else if (cur === this.root) {
            this.current = null;
        }
        else if (cur.next === null) {
            this.current = cur.parent;
            this.entering = false;
        }
        else {
            this.current = cur.next;
            this.entering = true;
        }
        return { entering: entering, node: cur };
    };
    NodeWalker.prototype.resumeAt = function (node, entering) {
        this.current = node;
        this.entering = entering === true;
    };
    return NodeWalker;
}());

function isContainer(node) {
    switch (node.type) {
        case 'document':
        case 'blockQuote':
        case 'list':
        case 'item':
        case 'paragraph':
        case 'heading':
        case 'emph':
        case 'strong':
        case 'strike':
        case 'link':
        case 'image':
        case 'table':
        case 'tableHead':
        case 'tableBody':
        case 'tableRow':
        case 'tableCell':
        case 'tableDelimRow':
        case 'customInline':
            return true;
        default:
            return false;
    }
}
var lastNodeId = 1;
var nodeMap = {};
function getNodeById(id) {
    return nodeMap[id];
}
function removeNodeById(id) {
    delete nodeMap[id];
}
function removeAllNode() {
    nodeMap = {};
}
var Node = /** @class */ (function () {
    function Node(nodeType, sourcepos) {
        this.parent = null;
        this.prev = null;
        this.next = null;
        // only for container node
        this.firstChild = null;
        this.lastChild = null;
        // only for leaf node
        this.literal = null;
        if (nodeType === 'document') {
            this.id = -1;
        }
        else {
            this.id = lastNodeId++;
        }
        this.type = nodeType;
        this.sourcepos = sourcepos;
        nodeMap[this.id] = this;
    }
    Node.prototype.isContainer = function () {
        return isContainer(this);
    };
    Node.prototype.unlink = function () {
        if (this.prev) {
            this.prev.next = this.next;
        }
        else if (this.parent) {
            this.parent.firstChild = this.next;
        }
        if (this.next) {
            this.next.prev = this.prev;
        }
        else if (this.parent) {
            this.parent.lastChild = this.prev;
        }
        this.parent = null;
        this.next = null;
        this.prev = null;
    };
    Node.prototype.replaceWith = function (node) {
        this.insertBefore(node);
        this.unlink();
    };
    Node.prototype.insertAfter = function (sibling) {
        sibling.unlink();
        sibling.next = this.next;
        if (sibling.next) {
            sibling.next.prev = sibling;
        }
        sibling.prev = this;
        this.next = sibling;
        if (this.parent) {
            sibling.parent = this.parent;
            if (!sibling.next) {
                sibling.parent.lastChild = sibling;
            }
        }
    };
    Node.prototype.insertBefore = function (sibling) {
        sibling.unlink();
        sibling.prev = this.prev;
        if (sibling.prev) {
            sibling.prev.next = sibling;
        }
        sibling.next = this;
        this.prev = sibling;
        sibling.parent = this.parent;
        if (!sibling.prev) {
            sibling.parent.firstChild = sibling;
        }
    };
    Node.prototype.appendChild = function (child) {
        child.unlink();
        child.parent = this;
        if (this.lastChild) {
            this.lastChild.next = child;
            child.prev = this.lastChild;
            this.lastChild = child;
        }
        else {
            this.firstChild = child;
            this.lastChild = child;
        }
    };
    Node.prototype.prependChild = function (child) {
        child.unlink();
        child.parent = this;
        if (this.firstChild) {
            this.firstChild.prev = child;
            child.next = this.firstChild;
            this.firstChild = child;
        }
        else {
            this.firstChild = child;
            this.lastChild = child;
        }
    };
    Node.prototype.walker = function () {
        return new NodeWalker(this);
    };
    return Node;
}());
var BlockNode = /** @class */ (function (_super) {
    __extends(BlockNode, _super);
    function BlockNode(nodeType, sourcepos) {
        var _this = _super.call(this, nodeType, sourcepos) || this;
        // temporal data (for parsing)
        _this.open = true;
        _this.lineOffsets = null;
        _this.stringContent = null;
        _this.lastLineBlank = false;
        _this.lastLineChecked = false;
        _this.type = nodeType;
        return _this;
    }
    return BlockNode;
}(Node));
var ListNode = /** @class */ (function (_super) {
    __extends(ListNode, _super);
    function ListNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.listData = null;
        return _this;
    }
    return ListNode;
}(BlockNode));
var HeadingNode = /** @class */ (function (_super) {
    __extends(HeadingNode, _super);
    function HeadingNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.level = 0;
        _this.headingType = 'atx';
        return _this;
    }
    return HeadingNode;
}(BlockNode));
var CodeBlockNode = /** @class */ (function (_super) {
    __extends(CodeBlockNode, _super);
    function CodeBlockNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isFenced = false;
        _this.fenceChar = null;
        _this.fenceLength = 0;
        _this.fenceOffset = -1;
        _this.info = null;
        _this.infoPadding = 0;
        return _this;
    }
    return CodeBlockNode;
}(BlockNode));
var TableNode = /** @class */ (function (_super) {
    __extends(TableNode, _super);
    function TableNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.columns = [];
        return _this;
    }
    return TableNode;
}(BlockNode));
var TableCellNode = /** @class */ (function (_super) {
    __extends(TableCellNode, _super);
    function TableCellNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.startIdx = 0;
        _this.endIdx = 0;
        _this.paddingLeft = 0;
        _this.paddingRight = 0;
        _this.ignored = false;
        return _this;
    }
    return TableCellNode;
}(BlockNode));
var RefDefNode = /** @class */ (function (_super) {
    __extends(RefDefNode, _super);
    function RefDefNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.title = '';
        _this.dest = '';
        _this.label = '';
        return _this;
    }
    return RefDefNode;
}(BlockNode));
var CustomBlockNode = /** @class */ (function (_super) {
    __extends(CustomBlockNode, _super);
    function CustomBlockNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.syntaxLength = 0;
        _this.offset = -1;
        _this.info = '';
        return _this;
    }
    return CustomBlockNode;
}(BlockNode));
var HtmlBlockNode = /** @class */ (function (_super) {
    __extends(HtmlBlockNode, _super);
    function HtmlBlockNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.htmlBlockType = -1;
        return _this;
    }
    return HtmlBlockNode;
}(BlockNode));
var LinkNode = /** @class */ (function (_super) {
    __extends(LinkNode, _super);
    function LinkNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.destination = null;
        _this.title = null;
        _this.extendedAutolink = false;
        return _this;
    }
    return LinkNode;
}(Node));
var CodeNode = /** @class */ (function (_super) {
    __extends(CodeNode, _super);
    function CodeNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tickCount = 0;
        return _this;
    }
    return CodeNode;
}(Node));
var CustomInlineNode = /** @class */ (function (_super) {
    __extends(CustomInlineNode, _super);
    function CustomInlineNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.info = '';
        return _this;
    }
    return CustomInlineNode;
}(Node));
function createNode(type, sourcepos) {
    switch (type) {
        case 'heading':
            return new HeadingNode(type, sourcepos);
        case 'list':
        case 'item':
            return new ListNode(type, sourcepos);
        case 'link':
        case 'image':
            return new LinkNode(type, sourcepos);
        case 'codeBlock':
            return new CodeBlockNode(type, sourcepos);
        case 'htmlBlock':
            return new HtmlBlockNode(type, sourcepos);
        case 'table':
            return new TableNode(type, sourcepos);
        case 'tableCell':
            return new TableCellNode(type, sourcepos);
        case 'document':
        case 'paragraph':
        case 'blockQuote':
        case 'thematicBreak':
        case 'tableRow':
        case 'tableBody':
        case 'tableHead':
        case 'frontMatter':
            return new BlockNode(type, sourcepos);
        case 'code':
            return new CodeNode(type, sourcepos);
        case 'refDef':
            return new RefDefNode(type, sourcepos);
        case 'customBlock':
            return new CustomBlockNode(type, sourcepos);
        case 'customInline':
            return new CustomInlineNode(type, sourcepos);
        default:
            return new Node(type, sourcepos);
    }
}
function isCodeBlock(node) {
    return node.type === 'codeBlock';
}
function isHtmlBlock(node) {
    return node.type === 'htmlBlock';
}
function isHeading(node) {
    return node.type === 'heading';
}
function isList(node) {
    return node.type === 'list';
}
function isTable(node) {
    return node.type === 'table';
}
function isRefDef(node) {
    return node.type === 'refDef';
}
function isCustomBlock(node) {
    return node.type === 'customBlock';
}
function isCustomInline(node) {
    return node.type === 'customInline';
}
function text(s, sourcepos) {
    var node = createNode('text', sourcepos);
    node.literal = s;
    return node;
}

var TAGNAME = '[A-Za-z][A-Za-z0-9-]*';
var ATTRIBUTENAME = '[a-zA-Z_:][a-zA-Z0-9:._-]*';
var UNQUOTEDVALUE = '[^"\'=<>`\\x00-\\x20]+';
var SINGLEQUOTEDVALUE = "'[^']*'";
var DOUBLEQUOTEDVALUE = '"[^"]*"';
var ATTRIBUTEVALUE = "(?:" + UNQUOTEDVALUE + "|" + SINGLEQUOTEDVALUE + "|" + DOUBLEQUOTEDVALUE + ")";
var ATTRIBUTEVALUESPEC = "" + '(?:\\s*=\\s*' + ATTRIBUTEVALUE + ")";
var ATTRIBUTE = "" + '(?:\\s+' + ATTRIBUTENAME + ATTRIBUTEVALUESPEC + "?)";
var OPENTAG = "<" + TAGNAME + ATTRIBUTE + "*\\s*/?>";
var CLOSETAG = "</" + TAGNAME + "\\s*[>]";
var HTMLCOMMENT = '<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->';
var PROCESSINGINSTRUCTION = '[<][?].*?[?][>]';
var DECLARATION = '<![A-Z]+\\s+[^>]*>';
var CDATA = '<!\\[CDATA\\[[\\s\\S]*?\\]\\]>';
var HTMLTAG = "(?:" + OPENTAG + "|" + CLOSETAG + "|" + HTMLCOMMENT + "|" + PROCESSINGINSTRUCTION + "|" + DECLARATION + "|" + CDATA + ")";
var reHtmlTag = new RegExp("^" + HTMLTAG, 'i');

// derived from https://github.com/mathiasbynens/String.fromCodePoint
/*! http://mths.be/fromcodepoint v0.2.1 by @mathias */
var fromCodePoint;
if (String.fromCodePoint) {
    fromCodePoint = function (_) {
        try {
            return String.fromCodePoint(_);
        }
        catch (e) {
            if (e instanceof RangeError) {
                return String.fromCharCode(0xfffd);
            }
            throw e;
        }
    };
}
else {
    var stringFromCharCode_1 = String.fromCharCode;
    var floor_1 = Math.floor;
    fromCodePoint = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var MAX_SIZE = 0x4000;
        var codeUnits = [];
        var highSurrogate;
        var lowSurrogate;
        var index = -1;
        var length = args.length;
        if (!length) {
            return '';
        }
        var result = '';
        while (++index < length) {
            var codePoint = Number(args[index]);
            if (!isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
                codePoint < 0 || // not a valid Unicode code point
                codePoint > 0x10ffff || // not a valid Unicode code point
                floor_1(codePoint) !== codePoint // not an integer
            ) {
                return String.fromCharCode(0xfffd);
            }
            if (codePoint <= 0xffff) {
                // BMP code point
                codeUnits.push(codePoint);
            }
            else {
                // Astral code point; split in surrogate halves
                // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
                codePoint -= 0x10000;
                highSurrogate = (codePoint >> 10) + 0xd800;
                lowSurrogate = (codePoint % 0x400) + 0xdc00;
                codeUnits.push(highSurrogate, lowSurrogate);
            }
            if (index + 1 === length || codeUnits.length > MAX_SIZE) {
                result += stringFromCharCode_1.apply(void 0, codeUnits);
                codeUnits.length = 0;
            }
        }
        return result;
    };
}
var fromCodePoint$1 = fromCodePoint;

var DOMAIN = '(?:[w-]+.)*[A-Za-z0-9-]+.[A-Za-z0-9-]+';
var PATH = '[^<\\s]*[^<?!.,:*_?~\\s]';
var EMAIL = '[\\w.+-]+@(?:[\\w-]+\\.)+[\\w-]+';
function trimUnmatchedTrailingParens(source) {
    var trailingParen = /\)+$/.exec(source);
    if (trailingParen) {
        var count = 0;
        for (var _i = 0, source_1 = source; _i < source_1.length; _i++) {
            var ch = source_1[_i];
            if (ch === '(') {
                if (count < 0) {
                    count = 1;
                }
                else {
                    count += 1;
                }
            }
            else if (ch === ')') {
                count -= 1;
            }
        }
        if (count < 0) {
            var trimCount = Math.min(-count, trailingParen[0].length);
            return source.substring(0, source.length - trimCount);
        }
    }
    return source;
}
function trimTrailingEntity(source) {
    return source.replace(/&[A-Za-z0-9]+;$/, '');
}
function parseEmailLink(source) {
    var reEmailLink = new RegExp(EMAIL, 'g');
    var result = [];
    var m;
    while ((m = reEmailLink.exec(source))) {
        var text_1 = m[0];
        if (!/[_-]+$/.test(text_1)) {
            result.push({
                text: text_1,
                range: [m.index, m.index + text_1.length - 1],
                url: "mailto:" + text_1,
            });
        }
    }
    return result;
}
function parseUrlLink(source) {
    var reWwwAutolink = new RegExp("(www|https?://)." + DOMAIN + PATH, 'g');
    var result = [];
    var m;
    while ((m = reWwwAutolink.exec(source))) {
        var text_2 = trimTrailingEntity(trimUnmatchedTrailingParens(m[0]));
        var scheme = m[1] === 'www' ? 'http://' : '';
        result.push({
            text: text_2,
            range: [m.index, m.index + text_2.length - 1],
            url: "" + scheme + text_2,
        });
    }
    return result;
}
function baseAutolinkParser(source) {
    return __spreadArray(__spreadArray([], parseUrlLink(source)), parseEmailLink(source)).sort(function (a, b) { return a.range[0] - b.range[0]; });
}
function convertExtAutoLinks(walker, autolinkParser) {
    if (typeof autolinkParser === 'boolean') {
        autolinkParser = baseAutolinkParser;
    }
    var event;
    var _loop_1 = function () {
        var entering = event.entering, node = event.node;
        if (entering && node.type === 'text' && node.parent.type !== 'link') {
            var literal = node.literal;
            var linkInfos = autolinkParser(literal);
            if (!linkInfos || !linkInfos.length) {
                return "continue";
            }
            var lastIdx = 0;
            var _a = node.sourcepos[0], lineNum_1 = _a[0], chPos_1 = _a[1];
            var sourcepos = function (startIdx, endIdx) { return [
                [lineNum_1, chPos_1 + startIdx],
                [lineNum_1, chPos_1 + endIdx],
            ]; };
            var newNodes = [];
            for (var _i = 0, linkInfos_1 = linkInfos; _i < linkInfos_1.length; _i++) {
                var _b = linkInfos_1[_i], range = _b.range, url = _b.url, linkText = _b.text;
                if (range[0] > lastIdx) {
                    newNodes.push(text(literal.substring(lastIdx, range[0]), sourcepos(lastIdx, range[0] - 1)));
                }
                var linkNode = createNode('link', sourcepos.apply(void 0, range));
                linkNode.appendChild(text(linkText, sourcepos.apply(void 0, range)));
                linkNode.destination = url;
                linkNode.extendedAutolink = true;
                newNodes.push(linkNode);
                lastIdx = range[1] + 1;
            }
            if (lastIdx < literal.length) {
                newNodes.push(text(literal.substring(lastIdx), sourcepos(lastIdx, literal.length - 1)));
            }
            for (var _c = 0, newNodes_1 = newNodes; _c < newNodes_1.length; _c++) {
                var newNode = newNodes_1[_c];
                node.insertBefore(newNode);
            }
            node.unlink();
        }
    };
    while ((event = walker.next())) {
        _loop_1();
    }
}

function last(arr) {
    return arr[arr.length - 1];
}
// normalize a reference in reference link (remove []s, trim,
// collapse internal space, unicode case fold.
// See commonmark/commonmark.js#168.
function normalizeReference(str) {
    return str
        .slice(1, str.length - 1)
        .trim()
        .replace(/[ \t\r\n]+/, ' ')
        .toLowerCase()
        .toUpperCase();
}
function iterateObject(obj, iteratee) {
    Object.keys(obj).forEach(function (key) {
        iteratee(key, obj[key]);
    });
}
function omit(obj) {
    var propNames = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        propNames[_i - 1] = arguments[_i];
    }
    var resultMap = __assign({}, obj);
    propNames.forEach(function (key) {
        delete resultMap[key];
    });
    return resultMap;
}
function isEmptyObj(obj) {
    return !Object.keys(obj).length;
}
function clearObj(obj) {
    Object.keys(obj).forEach(function (key) {
        delete obj[key];
    });
}

var C_NEWLINE = 10;
var C_ASTERISK = 42;
var C_UNDERSCORE = 95;
var C_BACKTICK = 96;
var C_OPEN_BRACKET$1 = 91;
var C_CLOSE_BRACKET = 93;
var C_TILDE = 126;
var C_LESSTHAN$1 = 60;
var C_BANG = 33;
var C_BACKSLASH = 92;
var C_AMPERSAND = 38;
var C_OPEN_PAREN = 40;
var C_CLOSE_PAREN = 41;
var C_COLON = 58;
var C_SINGLEQUOTE = 39;
var C_DOUBLEQUOTE = 34;
var C_DOLLAR = 36;
// Some regexps used in inline parser:
var ESCAPED_CHAR = "\\\\" + ESCAPABLE;
var rePunctuation = new RegExp(/[!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E42\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDF3C-\uDF3E]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]/);
var reLinkTitle = new RegExp("^(?:\"(" + ESCAPED_CHAR + "|[^\"\\x00])*\"" +
    "|" +
    ("'(" + ESCAPED_CHAR + "|[^'\\x00])*'") +
    "|" +
    ("\\((" + ESCAPED_CHAR + "|[^()\\x00])*\\))"));
var reLinkDestinationBraces = /^(?:<(?:[^<>\n\\\x00]|\\.)*>)/;
var reEscapable = new RegExp("^" + ESCAPABLE);
var reEntityHere = new RegExp("^" + ENTITY, 'i');
var reTicks = /`+/;
var reTicksHere = /^`+/;
var reEllipses = /\.\.\./g;
var reDash = /--+/g;
var reEmailAutolink = /^<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/;
var reAutolink = /^<[A-Za-z][A-Za-z0-9.+-]{1,31}:[^<>\x00-\x20]*>/i;
var reSpnl = /^ *(?:\n *)?/;
var reWhitespaceChar = /^[ \t\n\x0b\x0c\x0d]/;
var reUnicodeWhitespaceChar = /^\s/;
var reFinalSpace = / *$/;
var reInitialSpace = /^ */;
var reSpaceAtEndOfLine = /^ *(?:\n|$)/;
var reLinkLabel = /^\[(?:[^\\\[\]]|\\.){0,1000}\]/;
// Matches a string of non-special characters.
var reMain = /^[^\n`\[\]\\!<&*_'"~$]+/m;
var InlineParser = /** @class */ (function () {
    function InlineParser(options) {
        // An InlineParser keeps track of a subject (a string to be parsed)
        // and a position in that subject.
        this.subject = '';
        this.delimiters = null; // used by handleDelim method
        this.brackets = null;
        this.pos = 0;
        this.lineStartNum = 0;
        this.lineIdx = 0;
        this.lineOffsets = [0];
        this.linePosOffset = 0;
        this.refMap = {};
        this.refLinkCandidateMap = {};
        this.refDefCandidateMap = {};
        this.options = options;
    }
    InlineParser.prototype.sourcepos = function (start, end) {
        var linePosOffset = this.linePosOffset + this.lineOffsets[this.lineIdx];
        var lineNum = this.lineStartNum + this.lineIdx;
        var startpos = [lineNum, start + linePosOffset];
        if (typeof end === 'number') {
            return [startpos, [lineNum, end + linePosOffset]];
        }
        return startpos;
    };
    InlineParser.prototype.nextLine = function () {
        this.lineIdx += 1;
        this.linePosOffset = -this.pos;
    };
    // If re matches at current position in the subject, advance
    // position in subject and return the match; otherwise return null.
    InlineParser.prototype.match = function (re) {
        var m = re.exec(this.subject.slice(this.pos));
        if (m === null) {
            return null;
        }
        this.pos += m.index + m[0].length;
        return m[0];
    };
    // Returns the code for the character at the current subject position, or -1
    // there are no more characters.
    InlineParser.prototype.peek = function () {
        if (this.pos < this.subject.length) {
            return this.subject.charCodeAt(this.pos);
        }
        return -1;
    };
    // Parse zero or more space characters, including at most one newline
    InlineParser.prototype.spnl = function () {
        this.match(reSpnl);
        return true;
    };
    // All of the parsers below try to match something at the current position
    // in the subject.  If they succeed in matching anything, they
    // return the inline matched, advancing the subject.
    // Attempt to parse backticks, adding either a backtick code span or a
    // literal sequence of backticks.
    InlineParser.prototype.parseBackticks = function (block) {
        var startpos = this.pos + 1;
        var ticks = this.match(reTicksHere);
        if (ticks === null) {
            return false;
        }
        var afterOpenTicks = this.pos;
        var matched;
        while ((matched = this.match(reTicks)) !== null) {
            if (matched === ticks) {
                var contents = this.subject.slice(afterOpenTicks, this.pos - ticks.length);
                var sourcepos = this.sourcepos(startpos, this.pos);
                var lines = contents.split('\n');
                if (lines.length > 1) {
                    var lastLine = last(lines);
                    this.lineIdx += lines.length - 1;
                    this.linePosOffset = -(this.pos - lastLine.length - ticks.length);
                    sourcepos[1] = this.sourcepos(this.pos);
                    contents = lines.join(' ');
                }
                var node = createNode('code', sourcepos);
                if (contents.length > 0 &&
                    contents.match(/[^ ]/) !== null &&
                    contents[0] == ' ' &&
                    contents[contents.length - 1] == ' ') {
                    node.literal = contents.slice(1, contents.length - 1);
                }
                else {
                    node.literal = contents;
                }
                node.tickCount = ticks.length;
                block.appendChild(node);
                return true;
            }
        }
        // If we got here, we didn't match a closing backtick sequence.
        this.pos = afterOpenTicks;
        block.appendChild(text(ticks, this.sourcepos(startpos, this.pos - 1)));
        return true;
    };
    // Parse a backslash-escaped special character, adding either the escaped
    // character, a hard line break (if the backslash is followed by a newline),
    // or a literal backslash to the block's children.  Assumes current character
    // is a backslash.
    InlineParser.prototype.parseBackslash = function (block) {
        var subj = this.subject;
        var node;
        this.pos += 1;
        var startpos = this.pos;
        if (this.peek() === C_NEWLINE) {
            this.pos += 1;
            node = createNode('linebreak', this.sourcepos(this.pos - 1, this.pos));
            block.appendChild(node);
            this.nextLine();
        }
        else if (reEscapable.test(subj.charAt(this.pos))) {
            block.appendChild(text(subj.charAt(this.pos), this.sourcepos(startpos, this.pos)));
            this.pos += 1;
        }
        else {
            block.appendChild(text('\\', this.sourcepos(startpos, startpos)));
        }
        return true;
    };
    // Attempt to parse an autolink (URL or email in pointy brackets).
    InlineParser.prototype.parseAutolink = function (block) {
        var m;
        var dest;
        var node;
        var startpos = this.pos + 1;
        if ((m = this.match(reEmailAutolink))) {
            dest = m.slice(1, m.length - 1);
            node = createNode('link', this.sourcepos(startpos, this.pos));
            node.destination = normalizeURI("mailto:" + dest);
            node.title = '';
            node.appendChild(text(dest, this.sourcepos(startpos + 1, this.pos - 1)));
            block.appendChild(node);
            return true;
        }
        if ((m = this.match(reAutolink))) {
            dest = m.slice(1, m.length - 1);
            node = createNode('link', this.sourcepos(startpos, this.pos));
            node.destination = normalizeURI(dest);
            node.title = '';
            node.appendChild(text(dest, this.sourcepos(startpos + 1, this.pos - 1)));
            block.appendChild(node);
            return true;
        }
        return false;
    };
    // Attempt to parse a raw HTML tag.
    InlineParser.prototype.parseHtmlTag = function (block) {
        var startpos = this.pos + 1;
        var m = this.match(reHtmlTag);
        if (m === null) {
            return false;
        }
        var node = createNode('htmlInline', this.sourcepos(startpos, this.pos));
        node.literal = m;
        block.appendChild(node);
        return true;
    };
    // Scan a sequence of characters with code cc, and return information about
    // the number of delimiters and whether they are positioned such that
    // they can open and/or close emphasis or strong emphasis.  A utility
    // function for strong/emph parsing.
    InlineParser.prototype.scanDelims = function (cc) {
        var numdelims = 0;
        var startpos = this.pos;
        if (cc === C_SINGLEQUOTE || cc === C_DOUBLEQUOTE) {
            numdelims++;
            this.pos++;
        }
        else {
            while (this.peek() === cc) {
                numdelims++;
                this.pos++;
            }
        }
        if (numdelims === 0 || (numdelims < 2 && (cc === C_TILDE || cc === C_DOLLAR))) {
            this.pos = startpos;
            return null;
        }
        var charBefore = startpos === 0 ? '\n' : this.subject.charAt(startpos - 1);
        var ccAfter = this.peek();
        var charAfter;
        if (ccAfter === -1) {
            charAfter = '\n';
        }
        else {
            charAfter = fromCodePoint$1(ccAfter);
        }
        var afterIsWhitespace = reUnicodeWhitespaceChar.test(charAfter);
        var afterIsPunctuation = rePunctuation.test(charAfter);
        var beforeIsWhitespace = reUnicodeWhitespaceChar.test(charBefore);
        var beforeIsPunctuation = rePunctuation.test(charBefore);
        var leftFlanking = !afterIsWhitespace && (!afterIsPunctuation || beforeIsWhitespace || beforeIsPunctuation);
        var rightFlanking = !beforeIsWhitespace && (!beforeIsPunctuation || afterIsWhitespace || afterIsPunctuation);
        var canOpen;
        var canClose;
        if (cc === C_UNDERSCORE) {
            canOpen = leftFlanking && (!rightFlanking || beforeIsPunctuation);
            canClose = rightFlanking && (!leftFlanking || afterIsPunctuation);
        }
        else if (cc === C_SINGLEQUOTE || cc === C_DOUBLEQUOTE) {
            canOpen = leftFlanking && !rightFlanking;
            canClose = rightFlanking;
        }
        else if (cc === C_DOLLAR) {
            canOpen = !afterIsWhitespace;
            canClose = !beforeIsWhitespace;
        }
        else {
            canOpen = leftFlanking;
            canClose = rightFlanking;
        }
        this.pos = startpos;
        return { numdelims: numdelims, canOpen: canOpen, canClose: canClose };
    };
    // Handle a delimiter marker for emphasis or a quote.
    InlineParser.prototype.handleDelim = function (cc, block) {
        var res = this.scanDelims(cc);
        if (!res) {
            return false;
        }
        var numdelims = res.numdelims;
        var startpos = this.pos + 1;
        var contents;
        this.pos += numdelims;
        if (cc === C_SINGLEQUOTE) {
            contents = '\u2019';
        }
        else if (cc === C_DOUBLEQUOTE) {
            contents = '\u201C';
        }
        else {
            contents = this.subject.slice(startpos - 1, this.pos);
        }
        var node = text(contents, this.sourcepos(startpos, this.pos));
        block.appendChild(node);
        // Add entry to stack for this opener
        if ((res.canOpen || res.canClose) &&
            (this.options.smart || (cc !== C_SINGLEQUOTE && cc !== C_DOUBLEQUOTE))) {
            this.delimiters = {
                cc: cc,
                numdelims: numdelims,
                origdelims: numdelims,
                node: node,
                previous: this.delimiters,
                next: null,
                canOpen: res.canOpen,
                canClose: res.canClose,
            };
            if (this.delimiters.previous) {
                this.delimiters.previous.next = this.delimiters;
            }
        }
        return true;
    };
    InlineParser.prototype.removeDelimiter = function (delim) {
        if (delim.previous !== null) {
            delim.previous.next = delim.next;
        }
        if (delim.next === null) {
            // top of stack
            this.delimiters = delim.previous;
        }
        else {
            delim.next.previous = delim.previous;
        }
    };
    InlineParser.prototype.removeDelimitersBetween = function (bottom, top) {
        if (bottom.next !== top) {
            bottom.next = top;
            top.previous = bottom;
        }
    };
    /**
     * Process all delimiters - emphasis, strong emphasis, strikethrough(gfm)
     * If the smart punctuation options is true,
     * convert single/double quotes to corresponding unicode characters.
     **/
    InlineParser.prototype.processEmphasis = function (stackBottom) {
        var _a;
        var opener;
        var closer;
        var oldCloser;
        var openerInl, closerInl;
        var openerFound;
        var oddMatch = false;
        var openersBottom = (_a = {},
            _a[C_UNDERSCORE] = [stackBottom, stackBottom, stackBottom],
            _a[C_ASTERISK] = [stackBottom, stackBottom, stackBottom],
            _a[C_SINGLEQUOTE] = [stackBottom],
            _a[C_DOUBLEQUOTE] = [stackBottom],
            _a[C_TILDE] = [stackBottom],
            _a[C_DOLLAR] = [stackBottom],
            _a);
        // find first closer above stackBottom:
        closer = this.delimiters;
        while (closer !== null && closer.previous !== stackBottom) {
            closer = closer.previous;
        }
        // move forward, looking for closers, and handling each
        while (closer !== null) {
            var closercc = closer.cc;
            var closerEmph = closercc === C_UNDERSCORE || closercc === C_ASTERISK;
            if (!closer.canClose) {
                closer = closer.next;
            }
            else {
                // found emphasis closer. now look back for first matching opener:
                opener = closer.previous;
                openerFound = false;
                while (opener !== null &&
                    opener !== stackBottom &&
                    opener !== openersBottom[closercc][closerEmph ? closer.origdelims % 3 : 0]) {
                    oddMatch =
                        closerEmph &&
                            (closer.canOpen || opener.canClose) &&
                            closer.origdelims % 3 !== 0 &&
                            (opener.origdelims + closer.origdelims) % 3 === 0;
                    if (opener.cc === closer.cc && opener.canOpen && !oddMatch) {
                        openerFound = true;
                        break;
                    }
                    opener = opener.previous;
                }
                oldCloser = closer;
                if (closerEmph || closercc === C_TILDE || closercc === C_DOLLAR) {
                    if (!openerFound) {
                        closer = closer.next;
                    }
                    else if (opener) {
                        // (null opener check for type narrowing)
                        // calculate actual number of delimiters used from closer
                        var useDelims = closer.numdelims >= 2 && opener.numdelims >= 2 ? 2 : 1;
                        var emptyDelims = closerEmph ? 0 : 1;
                        openerInl = opener.node;
                        closerInl = closer.node;
                        // build contents for new emph element
                        var nodeType = closerEmph
                            ? useDelims === 1
                                ? 'emph'
                                : 'strong'
                            : 'strike';
                        if (closercc === C_DOLLAR) {
                            nodeType = 'customInline';
                        }
                        var newNode = createNode(nodeType);
                        var openerEndPos = openerInl.sourcepos[1];
                        var closerStartPos = closerInl.sourcepos[0];
                        newNode.sourcepos = [
                            [openerEndPos[0], openerEndPos[1] - useDelims + 1],
                            [closerStartPos[0], closerStartPos[1] + useDelims - 1],
                        ];
                        openerInl.sourcepos[1][1] -= useDelims;
                        closerInl.sourcepos[0][1] += useDelims;
                        openerInl.literal = openerInl.literal.slice(useDelims);
                        closerInl.literal = closerInl.literal.slice(useDelims);
                        opener.numdelims -= useDelims;
                        closer.numdelims -= useDelims;
                        // remove used delimiters from stack elts and inlines
                        var tmp = openerInl.next;
                        var next = void 0;
                        while (tmp && tmp !== closerInl) {
                            next = tmp.next;
                            tmp.unlink();
                            newNode.appendChild(tmp);
                            tmp = next;
                        }
                        // build custom inline node
                        if (closercc === C_DOLLAR) {
                            var textNode = newNode.firstChild;
                            var literal = textNode.literal || '';
                            var info = literal.split(/\s/)[0];
                            newNode.info = info;
                            if (literal.length <= info.length) {
                                textNode.unlink();
                            }
                            else {
                                textNode.sourcepos[0][1] += info.length;
                                textNode.literal = literal.replace(info + " ", '');
                            }
                        }
                        openerInl.insertAfter(newNode);
                        // remove elts between opener and closer in delimiters stack
                        this.removeDelimitersBetween(opener, closer);
                        // if opener has 0 delims, remove it and the inline
                        // if opener has 1 delims and character is tilde, remove delimiter only
                        if (opener.numdelims <= emptyDelims) {
                            if (opener.numdelims === 0) {
                                openerInl.unlink();
                            }
                            this.removeDelimiter(opener);
                        }
                        // if closer has 0 delims, remove it and the inline
                        // if closer has 1 delims and character is tilde, remove delimiter only
                        if (closer.numdelims <= emptyDelims) {
                            if (closer.numdelims === 0) {
                                closerInl.unlink();
                            }
                            var tempstack = closer.next;
                            this.removeDelimiter(closer);
                            closer = tempstack;
                        }
                    }
                }
                else if (closercc === C_SINGLEQUOTE) {
                    closer.node.literal = '\u2019';
                    if (openerFound) {
                        opener.node.literal = '\u2018';
                    }
                    closer = closer.next;
                }
                else if (closercc === C_DOUBLEQUOTE) {
                    closer.node.literal = '\u201D';
                    if (openerFound) {
                        opener.node.literal = '\u201C';
                    }
                    closer = closer.next;
                }
                if (!openerFound) {
                    // Set lower bound for future searches for openers:
                    openersBottom[closercc][closerEmph ? oldCloser.origdelims % 3 : 0] = oldCloser.previous;
                    if (!oldCloser.canOpen) {
                        // We can remove a closer that can't be an opener,
                        // once we've seen there's no matching opener:
                        this.removeDelimiter(oldCloser);
                    }
                }
            }
        }
        // remove all delimiters
        while (this.delimiters !== null && this.delimiters !== stackBottom) {
            this.removeDelimiter(this.delimiters);
        }
    };
    // Attempt to parse link title (sans quotes), returning the string
    // or null if no match.
    InlineParser.prototype.parseLinkTitle = function () {
        var title = this.match(reLinkTitle);
        if (title === null) {
            return null;
        }
        // chop off quotes from title and unescape:
        return unescapeString(title.substr(1, title.length - 2));
    };
    // Attempt to parse link destination, returning the string or null if no match.
    InlineParser.prototype.parseLinkDestination = function () {
        var res = this.match(reLinkDestinationBraces);
        if (res === null) {
            if (this.peek() === C_LESSTHAN$1) {
                return null;
            }
            // @TODO handrolled parser; res should be null or the string
            var savepos = this.pos;
            var openparens = 0;
            var c = void 0;
            while ((c = this.peek()) !== -1) {
                if (c === C_BACKSLASH && reEscapable.test(this.subject.charAt(this.pos + 1))) {
                    this.pos += 1;
                    if (this.peek() !== -1) {
                        this.pos += 1;
                    }
                }
                else if (c === C_OPEN_PAREN) {
                    this.pos += 1;
                    openparens += 1;
                }
                else if (c === C_CLOSE_PAREN) {
                    if (openparens < 1) {
                        break;
                    }
                    else {
                        this.pos += 1;
                        openparens -= 1;
                    }
                }
                else if (reWhitespaceChar.exec(fromCodePoint$1(c)) !== null) {
                    break;
                }
                else {
                    this.pos += 1;
                }
            }
            if (this.pos === savepos && c !== C_CLOSE_PAREN) {
                return null;
            }
            if (openparens !== 0) {
                return null;
            }
            res = this.subject.substr(savepos, this.pos - savepos);
            return normalizeURI(unescapeString(res));
        } // chop off surrounding <..>:
        return normalizeURI(unescapeString(res.substr(1, res.length - 2)));
    };
    // Attempt to parse a link label, returning number of characters parsed.
    InlineParser.prototype.parseLinkLabel = function () {
        var m = this.match(reLinkLabel);
        if (m === null || m.length > 1001) {
            return 0;
        }
        return m.length;
    };
    // Add open bracket to delimiter stack and add a text node to block's children.
    InlineParser.prototype.parseOpenBracket = function (block) {
        var startpos = this.pos;
        this.pos += 1;
        var node = text('[', this.sourcepos(this.pos, this.pos));
        block.appendChild(node);
        // Add entry to stack for this opener
        this.addBracket(node, startpos, false);
        return true;
    };
    // IF next character is [, and ! delimiter to delimiter stack and
    // add a text node to block's children.  Otherwise just add a text node.
    InlineParser.prototype.parseBang = function (block) {
        var startpos = this.pos;
        this.pos += 1;
        if (this.peek() === C_OPEN_BRACKET$1) {
            this.pos += 1;
            var node = text('![', this.sourcepos(this.pos - 1, this.pos));
            block.appendChild(node);
            // Add entry to stack for this opener
            this.addBracket(node, startpos + 1, true);
        }
        else {
            var node = text('!', this.sourcepos(this.pos, this.pos));
            block.appendChild(node);
        }
        return true;
    };
    // Try to match close bracket against an opening in the delimiter
    // stack.  Add either a link or image, or a plain [ character,
    // to block's children.  If there is a matching delimiter,
    // remove it from the delimiter stack.
    InlineParser.prototype.parseCloseBracket = function (block) {
        var dest = null;
        var title = null;
        var matched = false;
        this.pos += 1;
        var startpos = this.pos;
        // get last [ or ![
        var opener = this.brackets;
        if (opener === null) {
            // no matched opener, just return a literal
            block.appendChild(text(']', this.sourcepos(startpos, startpos)));
            return true;
        }
        if (!opener.active) {
            // no matched opener, just return a literal
            block.appendChild(text(']', this.sourcepos(startpos, startpos)));
            // take opener off brackets stack
            this.removeBracket();
            return true;
        }
        // If we got here, open is a potential opener
        var isImage = opener.image;
        // Check to see if we have a link/image
        var savepos = this.pos;
        // Inline link?
        if (this.peek() === C_OPEN_PAREN) {
            this.pos++;
            if (this.spnl() &&
                (dest = this.parseLinkDestination()) !== null &&
                this.spnl() &&
                // make sure there's a space before the title:
                ((reWhitespaceChar.test(this.subject.charAt(this.pos - 1)) &&
                    (title = this.parseLinkTitle())) ||
                    true) &&
                this.spnl() &&
                this.peek() === C_CLOSE_PAREN) {
                this.pos += 1;
                matched = true;
            }
            else {
                this.pos = savepos;
            }
        }
        var refLabel = '';
        if (!matched) {
            // Next, see if there's a link label
            var beforelabel = this.pos;
            var n = this.parseLinkLabel();
            if (n > 2) {
                refLabel = this.subject.slice(beforelabel, beforelabel + n);
            }
            else if (!opener.bracketAfter) {
                // Empty or missing second label means to use the first label as the reference.
                // The reference must not contain a bracket. If we know there's a bracket, we don't even bother checking it.
                refLabel = this.subject.slice(opener.index, startpos);
            }
            if (n === 0) {
                // If shortcut reference link, rewind before spaces we skipped.
                this.pos = savepos;
            }
            if (refLabel) {
                refLabel = normalizeReference(refLabel);
                // lookup rawlabel in refMap
                var link = this.refMap[refLabel];
                if (link) {
                    dest = link.destination;
                    title = link.title;
                    matched = true;
                }
            }
        }
        if (matched) {
            var node = createNode(isImage ? 'image' : 'link');
            node.destination = dest;
            node.title = title || '';
            node.sourcepos = [opener.startpos, this.sourcepos(this.pos)];
            var tmp = opener.node.next;
            var next = void 0;
            while (tmp) {
                next = tmp.next;
                tmp.unlink();
                node.appendChild(tmp);
                tmp = next;
            }
            block.appendChild(node);
            this.processEmphasis(opener.previousDelimiter);
            this.removeBracket();
            opener.node.unlink();
            // We remove this bracket and processEmphasis will remove later delimiters.
            // Now, for a link, we also deactivate earlier link openers.
            // (no links in links)
            if (!isImage) {
                opener = this.brackets;
                while (opener !== null) {
                    if (!opener.image) {
                        opener.active = false; // deactivate this opener
                    }
                    opener = opener.previous;
                }
            }
            if (this.options.referenceDefinition) {
                this.refLinkCandidateMap[block.id] = { node: block, refLabel: refLabel };
            }
            return true;
        } // no match
        this.removeBracket(); // remove this opener from stack
        this.pos = startpos;
        block.appendChild(text(']', this.sourcepos(startpos, startpos)));
        if (this.options.referenceDefinition) {
            this.refLinkCandidateMap[block.id] = { node: block, refLabel: refLabel };
        }
        return true;
    };
    InlineParser.prototype.addBracket = function (node, index, image) {
        if (this.brackets !== null) {
            this.brackets.bracketAfter = true;
        }
        this.brackets = {
            node: node,
            startpos: this.sourcepos(index + (image ? 0 : 1)),
            previous: this.brackets,
            previousDelimiter: this.delimiters,
            index: index,
            image: image,
            active: true,
        };
    };
    InlineParser.prototype.removeBracket = function () {
        if (this.brackets) {
            this.brackets = this.brackets.previous;
        }
    };
    // Attempt to parse an entity.
    InlineParser.prototype.parseEntity = function (block) {
        var m;
        var startpos = this.pos + 1;
        if ((m = this.match(reEntityHere))) {
            block.appendChild(text(lib.decodeHTML(m), this.sourcepos(startpos, this.pos)));
            return true;
        }
        return false;
    };
    // Parse a run of ordinary characters, or a single character with
    // a special meaning in markdown, as a plain string.
    InlineParser.prototype.parseString = function (block) {
        var m;
        var startpos = this.pos + 1;
        if ((m = this.match(reMain))) {
            if (this.options.smart) {
                var lit = m.replace(reEllipses, '\u2026').replace(reDash, function (chars) {
                    var enCount = 0;
                    var emCount = 0;
                    if (chars.length % 3 === 0) {
                        // If divisible by 3, use all em dashes
                        emCount = chars.length / 3;
                    }
                    else if (chars.length % 2 === 0) {
                        // If divisible by 2, use all en dashes
                        enCount = chars.length / 2;
                    }
                    else if (chars.length % 3 === 2) {
                        // If 2 extra dashes, use en dash for last 2; em dashes for rest
                        enCount = 1;
                        emCount = (chars.length - 2) / 3;
                    }
                    else {
                        // Use en dashes for last 4 hyphens; em dashes for rest
                        enCount = 2;
                        emCount = (chars.length - 4) / 3;
                    }
                    return repeat('\u2014', emCount) + repeat('\u2013', enCount);
                });
                block.appendChild(text(lit, this.sourcepos(startpos, this.pos)));
            }
            else {
                var node = text(m, this.sourcepos(startpos, this.pos));
                block.appendChild(node);
            }
            return true;
        }
        return false;
    };
    // Parse a newline.  If it was preceded by two spaces, return a hard
    // line break; otherwise a soft line break.
    InlineParser.prototype.parseNewline = function (block) {
        this.pos += 1; // assume we're at a \n
        // check previous node for trailing spaces
        var lastc = block.lastChild;
        if (lastc && lastc.type === 'text' && lastc.literal[lastc.literal.length - 1] === ' ') {
            var hardbreak = lastc.literal[lastc.literal.length - 2] === ' ';
            var litLen = lastc.literal.length;
            lastc.literal = lastc.literal.replace(reFinalSpace, '');
            var finalSpaceLen = litLen - lastc.literal.length;
            lastc.sourcepos[1][1] -= finalSpaceLen;
            block.appendChild(createNode(hardbreak ? 'linebreak' : 'softbreak', this.sourcepos(this.pos - finalSpaceLen, this.pos)));
        }
        else {
            block.appendChild(createNode('softbreak', this.sourcepos(this.pos, this.pos)));
        }
        this.nextLine();
        this.match(reInitialSpace); // gobble leading spaces in next line
        return true;
    };
    // Attempt to parse a link reference, modifying refmap.
    InlineParser.prototype.parseReference = function (block, refMap) {
        if (!this.options.referenceDefinition) {
            return 0;
        }
        this.subject = block.stringContent;
        this.pos = 0;
        var title = null;
        var startpos = this.pos;
        // label:
        var matchChars = this.parseLinkLabel();
        if (matchChars === 0) {
            return 0;
        }
        var rawlabel = this.subject.substr(0, matchChars);
        // colon:
        if (this.peek() === C_COLON) {
            this.pos++;
        }
        else {
            this.pos = startpos;
            return 0;
        }
        //  link url
        this.spnl();
        var dest = this.parseLinkDestination();
        if (dest === null) {
            this.pos = startpos;
            return 0;
        }
        var beforetitle = this.pos;
        this.spnl();
        if (this.pos !== beforetitle) {
            title = this.parseLinkTitle();
        }
        if (title === null) {
            title = '';
            // rewind before spaces
            this.pos = beforetitle;
        }
        // make sure we're at line end:
        var atLineEnd = true;
        if (this.match(reSpaceAtEndOfLine) === null) {
            if (title === '') {
                atLineEnd = false;
            }
            else {
                // the potential title we found is not at the line end,
                // but it could still be a legal link reference if we
                // discard the title
                title = '';
                // rewind before spaces
                this.pos = beforetitle;
                // and instead check if the link URL is at the line end
                atLineEnd = this.match(reSpaceAtEndOfLine) !== null;
            }
        }
        if (!atLineEnd) {
            this.pos = startpos;
            return 0;
        }
        var normalLabel = normalizeReference(rawlabel);
        if (normalLabel === '') {
            // label must contain non-whitespace characters
            this.pos = startpos;
            return 0;
        }
        var sourcepos = this.getReferenceDefSourcepos(block);
        block.sourcepos[0][0] = sourcepos[1][0] + 1;
        var node = createNode('refDef', sourcepos);
        node.title = title;
        node.dest = dest;
        node.label = normalLabel;
        block.insertBefore(node);
        if (!refMap[normalLabel]) {
            refMap[normalLabel] = createRefDefState(node);
        }
        else {
            this.refDefCandidateMap[node.id] = node;
        }
        return this.pos - startpos;
    };
    InlineParser.prototype.mergeTextNodes = function (walker) {
        var event;
        var textNodes = [];
        while ((event = walker.next())) {
            var entering = event.entering, node = event.node;
            if (entering && node.type === 'text') {
                textNodes.push(node);
            }
            else if (textNodes.length === 1) {
                textNodes = [];
            }
            else if (textNodes.length > 1) {
                var firstNode = textNodes[0];
                var lastNode = textNodes[textNodes.length - 1];
                if (firstNode.sourcepos && lastNode.sourcepos) {
                    firstNode.sourcepos[1] = lastNode.sourcepos[1];
                }
                firstNode.next = lastNode.next;
                if (firstNode.next) {
                    firstNode.next.prev = firstNode;
                }
                for (var i = 1; i < textNodes.length; i += 1) {
                    firstNode.literal += textNodes[i].literal;
                    textNodes[i].unlink();
                }
                textNodes = [];
            }
        }
    };
    InlineParser.prototype.getReferenceDefSourcepos = function (block) {
        var lines = block.stringContent.split(/\n|\r\n/);
        var passedUrlLine = false;
        var quotationCount = 0;
        var lastLineOffset = { line: 0, ch: 0 };
        for (var i = 0; i < lines.length; i += 1) {
            var line = lines[i];
            if (reWhitespaceChar.test(line)) {
                break;
            }
            if (/\:/.test(line) && quotationCount === 0) {
                if (passedUrlLine) {
                    break;
                }
                var lineOffset = line.indexOf(':') === line.length - 1 ? i + 1 : i;
                lastLineOffset = { line: lineOffset, ch: lines[lineOffset].length };
                passedUrlLine = true;
            }
            // should consider extendable title
            var matched = line.match(/'|"/g);
            if (matched) {
                quotationCount += matched.length;
            }
            if (quotationCount === 2) {
                lastLineOffset = { line: i, ch: line.length };
                break;
            }
        }
        return [
            [block.sourcepos[0][0], block.sourcepos[0][1]],
            [block.sourcepos[0][0] + lastLineOffset.line, lastLineOffset.ch],
        ];
    };
    // Parse the next inline element in subject, advancing subject position.
    // On success, add the result to block's children and return true.
    // On failure, return false.
    InlineParser.prototype.parseInline = function (block) {
        var _a;
        var res = false;
        var c = this.peek();
        if (c === -1) {
            return false;
        }
        switch (c) {
            case C_NEWLINE:
                res = this.parseNewline(block);
                break;
            case C_BACKSLASH:
                res = this.parseBackslash(block);
                break;
            case C_BACKTICK:
                res = this.parseBackticks(block);
                break;
            case C_ASTERISK:
            case C_UNDERSCORE:
            case C_TILDE:
            case C_DOLLAR:
                res = this.handleDelim(c, block);
                break;
            case C_SINGLEQUOTE:
            case C_DOUBLEQUOTE:
                res = !!((_a = this.options) === null || _a === void 0 ? void 0 : _a.smart) && this.handleDelim(c, block);
                break;
            case C_OPEN_BRACKET$1:
                res = this.parseOpenBracket(block);
                break;
            case C_BANG:
                res = this.parseBang(block);
                break;
            case C_CLOSE_BRACKET:
                res = this.parseCloseBracket(block);
                break;
            case C_LESSTHAN$1:
                res = this.parseAutolink(block) || this.parseHtmlTag(block);
                break;
            case C_AMPERSAND:
                if (!block.disabledEntityParse) {
                    res = this.parseEntity(block);
                }
                break;
            default:
                res = this.parseString(block);
                break;
        }
        if (!res) {
            this.pos += 1;
            block.appendChild(text(fromCodePoint$1(c), this.sourcepos(this.pos, this.pos + 1)));
        }
        return true;
    };
    // Parse string content in block into inline children,
    // using refmap to resolve references.
    InlineParser.prototype.parse = function (block) {
        this.subject = block.stringContent.trim();
        this.pos = 0;
        this.delimiters = null;
        this.brackets = null;
        this.lineOffsets = block.lineOffsets || [0];
        this.lineIdx = 0;
        this.linePosOffset = 0;
        this.lineStartNum = block.sourcepos[0][0];
        if (isHeading(block)) {
            this.lineOffsets[0] += block.level + 1;
        }
        while (this.parseInline(block)) { }
        block.stringContent = null; // allow raw string to be garbage collected
        this.processEmphasis(null);
        this.mergeTextNodes(block.walker());
        var _a = this.options, extendedAutolinks = _a.extendedAutolinks, customParser = _a.customParser;
        if (extendedAutolinks) {
            convertExtAutoLinks(block.walker(), extendedAutolinks);
        }
        if (customParser && block.firstChild) {
            var event_1;
            var walker = block.firstChild.walker();
            while ((event_1 = walker.next())) {
                var node = event_1.node, entering = event_1.entering;
                if (customParser[node.type]) {
                    customParser[node.type](node, { entering: entering, options: this.options });
                }
            }
        }
    };
    return InlineParser;
}());

var reTaskListItemMarker = /^\[([ \txX])\][ \t]+/;
// finalize for block handler
function taskListItemFinalize(_, block) {
    if (block.firstChild && block.firstChild.type === 'paragraph') {
        var p = block.firstChild;
        var m = p.stringContent.match(reTaskListItemMarker);
        if (m) {
            var mLen = m[0].length;
            p.stringContent = p.stringContent.substring(mLen - 1);
            p.sourcepos[0][1] += mLen;
            p.lineOffsets[0] += mLen;
            block.listData.task = true;
            block.listData.checked = /[xX]/.test(m[1]);
        }
    }
}

var table = {
    continue: function () {
        return 0 /* Go */;
    },
    finalize: function () { },
    canContain: function (t) {
        return t === 'tableHead' || t === 'tableBody';
    },
    acceptsLines: false,
};
var tableBody$1 = {
    continue: function () {
        return 0 /* Go */;
    },
    finalize: function () { },
    canContain: function (t) {
        return t === 'tableRow';
    },
    acceptsLines: false,
};
var tableHead$1 = {
    continue: function () {
        return 1 /* Stop */;
    },
    finalize: function () { },
    canContain: function (t) {
        return t === 'tableRow' || t === 'tableDelimRow';
    },
    acceptsLines: false,
};
var tableDelimRow = {
    continue: function () {
        return 1 /* Stop */;
    },
    finalize: function () { },
    canContain: function (t) {
        return t === 'tableDelimCell';
    },
    acceptsLines: false,
};
var tableDelimCell = {
    continue: function () {
        return 1 /* Stop */;
    },
    finalize: function () { },
    canContain: function () {
        return false;
    },
    acceptsLines: false,
};
var tableRow = {
    continue: function () {
        return 1 /* Stop */;
    },
    finalize: function () { },
    canContain: function (t) {
        return t === 'tableCell';
    },
    acceptsLines: false,
};
var tableCell = {
    continue: function () {
        return 1 /* Stop */;
    },
    finalize: function () { },
    canContain: function () {
        return false;
    },
    acceptsLines: false,
};

var CODE_INDENT = 4;
var C_TAB = 9;
var C_GREATERTHAN = 62;
var C_LESSTHAN = 60;
var C_SPACE = 32;
var C_OPEN_BRACKET = 91;
var reNonSpace = /[^ \t\f\v\r\n]/;
var reClosingCodeFence = /^(?:`{3,}|~{3,})(?= *$)/;
// Returns true if block ends with a blank line, descending if needed
// into lists and sublists.
function endsWithBlankLine(block) {
    var curBlock = block;
    while (curBlock) {
        if (curBlock.lastLineBlank) {
            return true;
        }
        var t = curBlock.type;
        if (!curBlock.lastLineChecked && (t === 'list' || t === 'item')) {
            curBlock.lastLineChecked = true;
            curBlock = curBlock.lastChild;
        }
        else {
            curBlock.lastLineChecked = true;
            break;
        }
    }
    return false;
}
function peek(ln, pos) {
    if (pos < ln.length) {
        return ln.charCodeAt(pos);
    }
    return -1;
}
// Returns true if string contains only space characters.
function isBlank(s) {
    return !reNonSpace.test(s);
}
function isSpaceOrTab(c) {
    return c === C_SPACE || c === C_TAB;
}

var reClosingCustomBlock = /^\$\$$/;
var customBlock$1 = {
    continue: function (parser, container) {
        var line = parser.currentLine;
        var match = line.match(reClosingCustomBlock);
        if (match) {
            // closing custom block
            parser.lastLineLength = match[0].length;
            parser.finalize(container, parser.lineNumber);
            return 2 /* Finished */;
        }
        // skip optional spaces of custom block offset
        var i = container.offset;
        while (i > 0 && isSpaceOrTab(peek(line, parser.offset))) {
            parser.advanceOffset(1, true);
            i--;
        }
        return 0 /* Go */;
    },
    finalize: function (_, block) {
        if (block.stringContent === null) {
            return;
        }
        // first line becomes info string
        var content = block.stringContent;
        var newlinePos = content.indexOf('\n');
        var firstLine = content.slice(0, newlinePos);
        var rest = content.slice(newlinePos + 1);
        var infoString = firstLine.match(/^(\s*)(.*)/);
        block.info = unescapeString(infoString[2].trim());
        block.literal = rest;
        block.stringContent = null;
    },
    canContain: function () {
        return false;
    },
    acceptsLines: true,
};

var noop = {
    continue: function () {
        return 1 /* Stop */;
    },
    finalize: function () { },
    canContain: function () {
        return false;
    },
    acceptsLines: true,
};
var document$1 = {
    continue: function () {
        return 0 /* Go */;
    },
    finalize: function () { },
    canContain: function (t) {
        return t !== 'item';
    },
    acceptsLines: false,
};
var list = {
    continue: function () {
        return 0 /* Go */;
    },
    finalize: function (_, block) {
        var item = block.firstChild;
        while (item) {
            // check for non-final list item ending with blank line:
            if (endsWithBlankLine(item) && item.next) {
                block.listData.tight = false;
                break;
            }
            // recurse into children of list item, to see if there are
            // spaces between any of them:
            var subitem = item.firstChild;
            while (subitem) {
                if (endsWithBlankLine(subitem) && (item.next || subitem.next)) {
                    block.listData.tight = false;
                    break;
                }
                subitem = subitem.next;
            }
            item = item.next;
        }
    },
    canContain: function (t) {
        return t === 'item';
    },
    acceptsLines: false,
};
var blockQuote$1 = {
    continue: function (parser) {
        var ln = parser.currentLine;
        if (!parser.indented && peek(ln, parser.nextNonspace) === C_GREATERTHAN) {
            parser.advanceNextNonspace();
            parser.advanceOffset(1, false);
            if (isSpaceOrTab(peek(ln, parser.offset))) {
                parser.advanceOffset(1, true);
            }
        }
        else {
            return 1 /* Stop */;
        }
        return 0 /* Go */;
    },
    finalize: function () { },
    canContain: function (t) {
        return t !== 'item';
    },
    acceptsLines: false,
};
var item = {
    continue: function (parser, container) {
        if (parser.blank) {
            if (container.firstChild === null) {
                // Blank line after empty list item
                return 1 /* Stop */;
            }
            parser.advanceNextNonspace();
        }
        else if (parser.indent >= container.listData.markerOffset + container.listData.padding) {
            parser.advanceOffset(container.listData.markerOffset + container.listData.padding, true);
        }
        else {
            return 1 /* Stop */;
        }
        return 0 /* Go */;
    },
    finalize: taskListItemFinalize,
    canContain: function (t) {
        return t !== 'item';
    },
    acceptsLines: false,
};
var heading = {
    continue: function () {
        // a heading can never container > 1 line, so fail to match:
        return 1 /* Stop */;
    },
    finalize: function () { },
    canContain: function () {
        return false;
    },
    acceptsLines: false,
};
var thematicBreak$1 = {
    continue: function () {
        // a thematic break can never container > 1 line, so fail to match:
        return 1 /* Stop */;
    },
    finalize: function () { },
    canContain: function () {
        return false;
    },
    acceptsLines: false,
};
var codeBlock = {
    continue: function (parser, container) {
        var ln = parser.currentLine;
        var indent = parser.indent;
        if (container.isFenced) {
            // fenced
            var match = indent <= 3 &&
                ln.charAt(parser.nextNonspace) === container.fenceChar &&
                ln.slice(parser.nextNonspace).match(reClosingCodeFence);
            if (match && match[0].length >= container.fenceLength) {
                // closing fence - we're at end of line, so we can return
                parser.lastLineLength = parser.offset + indent + match[0].length;
                parser.finalize(container, parser.lineNumber);
                return 2 /* Finished */;
            }
            // skip optional spaces of fence offset
            var i = container.fenceOffset;
            while (i > 0 && isSpaceOrTab(peek(ln, parser.offset))) {
                parser.advanceOffset(1, true);
                i--;
            }
        }
        else {
            // indented
            if (indent >= CODE_INDENT) {
                parser.advanceOffset(CODE_INDENT, true);
            }
            else if (parser.blank) {
                parser.advanceNextNonspace();
            }
            else {
                return 1 /* Stop */;
            }
        }
        return 0 /* Go */;
    },
    finalize: function (_, block) {
        var _a;
        if (block.stringContent === null) {
            return;
        }
        if (block.isFenced) {
            // fenced
            // first line becomes info string
            var content = block.stringContent;
            var newlinePos = content.indexOf('\n');
            var firstLine = content.slice(0, newlinePos);
            var rest = content.slice(newlinePos + 1);
            var infoString = firstLine.match(/^(\s*)(.*)/);
            block.infoPadding = infoString[1].length;
            block.info = unescapeString(infoString[2].trim());
            block.literal = rest;
        }
        else {
            // indented
            block.literal = (_a = block.stringContent) === null || _a === void 0 ? void 0 : _a.replace(/(\n *)+$/, '\n');
        }
        block.stringContent = null; // allow GC
    },
    canContain: function () {
        return false;
    },
    acceptsLines: true,
};
var htmlBlock$1 = {
    continue: function (parser, container) {
        return parser.blank && (container.htmlBlockType === 6 || container.htmlBlockType === 7)
            ? 1 /* Stop */
            : 0 /* Go */;
    },
    finalize: function (_, block) {
        var _a;
        block.literal = ((_a = block.stringContent) === null || _a === void 0 ? void 0 : _a.replace(/(\n *)+$/, '')) || null;
        block.stringContent = null; // allow GC
    },
    canContain: function () {
        return false;
    },
    acceptsLines: true,
};
var paragraph = {
    continue: function (parser) {
        return parser.blank ? 1 /* Stop */ : 0 /* Go */;
    },
    finalize: function (parser, block) {
        if (block.stringContent === null) {
            return;
        }
        var pos;
        var hasReferenceDefs = false;
        // try parsing the beginning as link reference definitions:
        while (peek(block.stringContent, 0) === C_OPEN_BRACKET &&
            (pos = parser.inlineParser.parseReference(block, parser.refMap))) {
            block.stringContent = block.stringContent.slice(pos);
            hasReferenceDefs = true;
        }
        if (hasReferenceDefs && isBlank(block.stringContent)) {
            block.unlink();
        }
    },
    canContain: function () {
        return false;
    },
    acceptsLines: true,
};
var refDef = noop;
var frontMatter$2 = noop;
var blockHandlers = {
    document: document$1,
    list: list,
    blockQuote: blockQuote$1,
    item: item,
    heading: heading,
    thematicBreak: thematicBreak$1,
    codeBlock: codeBlock,
    htmlBlock: htmlBlock$1,
    paragraph: paragraph,
    table: table,
    tableBody: tableBody$1,
    tableHead: tableHead$1,
    tableRow: tableRow,
    tableCell: tableCell,
    tableDelimRow: tableDelimRow,
    tableDelimCell: tableDelimCell,
    refDef: refDef,
    customBlock: customBlock$1,
    frontMatter: frontMatter$2,
};

function parseRowContent(content) {
    var startIdx = 0;
    var offset = 0;
    var cells = [];
    for (var i = 0; i < content.length; i += 1) {
        if (content[i] === '|' && content[i - 1] !== '\\') {
            var cell = content.substring(startIdx, i);
            if (startIdx === 0 && isEmpty(cell)) {
                offset = i + 1;
            }
            else {
                cells.push(cell);
            }
            startIdx = i + 1;
        }
    }
    if (startIdx < content.length) {
        var cell = content.substring(startIdx, content.length);
        if (!isEmpty(cell)) {
            cells.push(cell);
        }
    }
    return [offset, cells];
}
function generateTableCells(cellType, contents, lineNum, chPos) {
    var cells = [];
    for (var _i = 0, contents_1 = contents; _i < contents_1.length; _i++) {
        var content = contents_1[_i];
        var preSpaces = content.match(/^[ \t]+/);
        var paddingLeft = preSpaces ? preSpaces[0].length : 0;
        var paddingRight = void 0, trimmed = void 0;
        if (paddingLeft === content.length) {
            paddingLeft = 0;
            paddingRight = 0;
            trimmed = '';
        }
        else {
            var postSpaces = content.match(/[ \t]+$/);
            paddingRight = postSpaces ? postSpaces[0].length : 0;
            trimmed = content.slice(paddingLeft, content.length - paddingRight);
        }
        var chPosStart = chPos + paddingLeft;
        var tableCell = createNode(cellType, [
            [lineNum, chPos],
            [lineNum, chPos + content.length - 1],
        ]);
        tableCell.stringContent = trimmed.replace(/\\\|/g, '|'); // replace esacped pipe(\|)
        tableCell.startIdx = cells.length;
        tableCell.endIdx = cells.length;
        tableCell.lineOffsets = [chPosStart - 1];
        tableCell.paddingLeft = paddingLeft;
        tableCell.paddingRight = paddingRight;
        cells.push(tableCell);
        chPos += content.length + 1;
    }
    return cells;
}
function getColumnFromDelimCell(cellNode) {
    var align = null;
    var content = cellNode.stringContent;
    var firstCh = content[0];
    var lastCh = content[content.length - 1];
    if (lastCh === ':') {
        align = firstCh === ':' ? 'center' : 'right';
    }
    else if (firstCh === ':') {
        align = 'left';
    }
    return { align: align };
}
var tableHead = function (parser, container) {
    var stringContent = container.stringContent;
    if (container.type === 'paragraph' && !parser.indented && !parser.blank) {
        var lastNewLineIdx = stringContent.length - 1;
        var lastLineStartIdx = stringContent.lastIndexOf('\n', lastNewLineIdx - 1) + 1;
        var headerContent = stringContent.slice(lastLineStartIdx, lastNewLineIdx);
        var delimContent = parser.currentLine.slice(parser.nextNonspace);
        var _a = parseRowContent(headerContent), headerOffset = _a[0], headerCells = _a[1];
        var _b = parseRowContent(delimContent), delimOffset = _b[0], delimCells = _b[1];
        var reValidDelimCell_1 = /^[ \t]*:?-+:?[ \t]*$/;
        if (
        // not checking if the number of header cells and delimiter cells are the same
        // to consider the case of merged-column (via plugin)
        !headerCells.length ||
            !delimCells.length ||
            delimCells.some(function (cell) { return !reValidDelimCell_1.test(cell); }) ||
            // to prevent to regard setTextHeading as tabel delim cell with 'disallowDeepHeading' option
            (delimCells.length === 1 && delimContent.indexOf('|') !== 0)) {
            return 0 /* None */;
        }
        var lineOffsets = container.lineOffsets;
        var firstLineNum = parser.lineNumber - 1;
        var firstLineStart = last(lineOffsets) + 1;
        var table = createNode('table', [
            [firstLineNum, firstLineStart],
            [parser.lineNumber, parser.offset],
        ]);
        // eslint-disable-next-line arrow-body-style
        table.columns = delimCells.map(function () { return ({ align: null }); });
        container.insertAfter(table);
        if (lineOffsets.length === 1) {
            container.unlink();
        }
        else {
            container.stringContent = stringContent.slice(0, lastLineStartIdx);
            var paraLastLineStartIdx = stringContent.lastIndexOf('\n', lastLineStartIdx - 2) + 1;
            var paraLastLineLen = lastLineStartIdx - paraLastLineStartIdx - 1;
            parser.lastLineLength = lineOffsets[lineOffsets.length - 2] + paraLastLineLen;
            parser.finalize(container, firstLineNum - 1);
        }
        parser.advanceOffset(parser.currentLine.length - parser.offset, false);
        var tableHead_1 = createNode('tableHead', [
            [firstLineNum, firstLineStart],
            [parser.lineNumber, parser.offset],
        ]);
        table.appendChild(tableHead_1);
        var tableHeadRow_1 = createNode('tableRow', [
            [firstLineNum, firstLineStart],
            [firstLineNum, firstLineStart + headerContent.length - 1],
        ]);
        var tableDelimRow_1 = createNode('tableDelimRow', [
            [parser.lineNumber, parser.nextNonspace + 1],
            [parser.lineNumber, parser.offset],
        ]);
        tableHead_1.appendChild(tableHeadRow_1);
        tableHead_1.appendChild(tableDelimRow_1);
        generateTableCells('tableCell', headerCells, firstLineNum, firstLineStart + headerOffset).forEach(function (cellNode) {
            tableHeadRow_1.appendChild(cellNode);
        });
        var delimCellNodes = generateTableCells('tableDelimCell', delimCells, parser.lineNumber, parser.nextNonspace + 1 + delimOffset);
        delimCellNodes.forEach(function (cellNode) {
            tableDelimRow_1.appendChild(cellNode);
        });
        table.columns = delimCellNodes.map(getColumnFromDelimCell);
        parser.tip = table;
        return 2 /* Leaf */;
    }
    return 0 /* None */;
};
var tableBody = function (parser, container) {
    if ((container.type !== 'table' && container.type !== 'tableBody') ||
        (!parser.blank && parser.currentLine.indexOf('|') === -1)) {
        return 0 /* None */;
    }
    parser.advanceOffset(parser.currentLine.length - parser.offset, false);
    if (parser.blank) {
        var table_1 = container;
        if (container.type === 'tableBody') {
            table_1 = container.parent;
            parser.finalize(container, parser.lineNumber - 1);
        }
        parser.finalize(table_1, parser.lineNumber - 1);
        return 0 /* None */;
    }
    var tableBody = container;
    if (container.type === 'table') {
        tableBody = parser.addChild('tableBody', parser.nextNonspace);
        tableBody.stringContent = null;
    }
    var tableRow = createNode('tableRow', [
        [parser.lineNumber, parser.nextNonspace + 1],
        [parser.lineNumber, parser.currentLine.length],
    ]);
    tableBody.appendChild(tableRow);
    var table = tableBody.parent;
    var content = parser.currentLine.slice(parser.nextNonspace);
    var _a = parseRowContent(content), offset = _a[0], cellContents = _a[1];
    generateTableCells('tableCell', cellContents, parser.lineNumber, parser.nextNonspace + 1 + offset).forEach(function (cellNode, idx) {
        if (idx >= table.columns.length) {
            cellNode.ignored = true;
        }
        tableRow.appendChild(cellNode);
    });
    return 2 /* Leaf */;
};

var reCustomBlock = /^(\$\$)(\s*[a-zA-Z])+/;
var reCanBeCustomInline = /^(\$\$)(\s*[a-zA-Z])+.*(\$\$)/;
var customBlock = function (parser) {
    var match;
    if (!parser.indented &&
        !reCanBeCustomInline.test(parser.currentLine) &&
        (match = parser.currentLine.match(reCustomBlock))) {
        var syntaxLength = match[1].length;
        parser.closeUnmatchedBlocks();
        var container = parser.addChild('customBlock', parser.nextNonspace);
        container.syntaxLength = syntaxLength;
        container.offset = parser.indent;
        parser.advanceNextNonspace();
        parser.advanceOffset(syntaxLength, false);
        return 2 /* Leaf */;
    }
    return 0 /* None */;
};

var reCodeFence = /^`{3,}(?!.*`)|^~{3,}/;
var reHtmlBlockOpen = [
    /./,
    /^<(?:script|pre|style)(?:\s|>|$)/i,
    /^<!--/,
    /^<[?]/,
    /^<![A-Z]/,
    /^<!\[CDATA\[/,
    /^<[/]?(?:address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[123456]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul)(?:\s|[/]?[>]|$)/i,
    new RegExp("^(?:" + OPENTAG + "|" + CLOSETAG + ")\\s*$", 'i'),
];
var reSetextHeadingLine = /^(?:=+|-+)[ \t]*$/;
var reATXHeadingMarker = /^#{1,6}(?:[ \t]+|$)/;
var reThematicBreak = /^(?:(?:\*[ \t]*){3,}|(?:_[ \t]*){3,}|(?:-[ \t]*){3,})[ \t]*$/;
var reBulletListMarker = /^[*+-]/;
var reOrderedListMarker = /^(\d{1,9})([.)])/;
// Parse a list marker and return data on the marker (type,
// start, delimiter, bullet character, padding) or null.
function parseListMarker(parser, container) {
    var rest = parser.currentLine.slice(parser.nextNonspace);
    var match;
    var nextc;
    var data = {
        type: 'bullet',
        tight: true,
        bulletChar: '',
        start: 0,
        delimiter: '',
        padding: 0,
        markerOffset: parser.indent,
        // GFM: Task List Item
        task: false,
        checked: false,
    };
    if (parser.indent >= 4) {
        return null;
    }
    if ((match = rest.match(reBulletListMarker))) {
        data.type = 'bullet';
        data.bulletChar = match[0][0];
    }
    else if ((match = rest.match(reOrderedListMarker)) &&
        (container.type !== 'paragraph' || match[1] === '1')) {
        data.type = 'ordered';
        data.start = parseInt(match[1], 10);
        data.delimiter = match[2];
    }
    else {
        return null;
    }
    // make sure we have spaces after
    nextc = peek(parser.currentLine, parser.nextNonspace + match[0].length);
    if (!(nextc === -1 || nextc === C_TAB || nextc === C_SPACE)) {
        return null;
    }
    // if it interrupts paragraph, make sure first line isn't blank
    if (container.type === 'paragraph' &&
        !parser.currentLine.slice(parser.nextNonspace + match[0].length).match(reNonSpace)) {
        return null;
    }
    // we've got a match! advance offset and calculate padding
    parser.advanceNextNonspace(); // to start of marker
    parser.advanceOffset(match[0].length, true); // to end of marker
    var spacesStartCol = parser.column;
    var spacesStartOffset = parser.offset;
    do {
        parser.advanceOffset(1, true);
        nextc = peek(parser.currentLine, parser.offset);
    } while (parser.column - spacesStartCol < 5 && isSpaceOrTab(nextc));
    var blankItem = peek(parser.currentLine, parser.offset) === -1;
    var spacesAfterMarker = parser.column - spacesStartCol;
    if (spacesAfterMarker >= 5 || spacesAfterMarker < 1 || blankItem) {
        data.padding = match[0].length + 1;
        parser.column = spacesStartCol;
        parser.offset = spacesStartOffset;
        if (isSpaceOrTab(peek(parser.currentLine, parser.offset))) {
            parser.advanceOffset(1, true);
        }
    }
    else {
        data.padding = match[0].length + spacesAfterMarker;
    }
    return data;
}
// Returns true if the two list items are of the same type,
// with the same delimiter and bullet character.  This is used
// in agglomerating list items into lists.
function listsMatch(listData, itemData) {
    return (listData.type === itemData.type &&
        listData.delimiter === itemData.delimiter &&
        listData.bulletChar === itemData.bulletChar);
}
function isDisallowedDeepHeading(parser, node) {
    return parser.options.disallowDeepHeading && (node.type === 'blockQuote' || node.type === 'item');
}
var blockQuote = function (parser) {
    if (!parser.indented && peek(parser.currentLine, parser.nextNonspace) === C_GREATERTHAN) {
        parser.advanceNextNonspace();
        parser.advanceOffset(1, false);
        // optional following space
        if (isSpaceOrTab(peek(parser.currentLine, parser.offset))) {
            parser.advanceOffset(1, true);
        }
        parser.closeUnmatchedBlocks();
        parser.addChild('blockQuote', parser.nextNonspace);
        return 1 /* Container */;
    }
    return 0 /* None */;
};
var atxHeading = function (parser, container) {
    var match;
    if (!parser.indented &&
        // The nested Heading is disallowed in list and blockquote with 'disallowDeepHeading' option
        !isDisallowedDeepHeading(parser, container) &&
        (match = parser.currentLine.slice(parser.nextNonspace).match(reATXHeadingMarker))) {
        parser.advanceNextNonspace();
        parser.advanceOffset(match[0].length, false);
        parser.closeUnmatchedBlocks();
        var heading = parser.addChild('heading', parser.nextNonspace);
        heading.level = match[0].trim().length; // number of #s
        heading.headingType = 'atx';
        // remove trailing ###s:
        heading.stringContent = parser.currentLine
            .slice(parser.offset)
            .replace(/^[ \t]*#+[ \t]*$/, '')
            .replace(/[ \t]+#+[ \t]*$/, '');
        parser.advanceOffset(parser.currentLine.length - parser.offset);
        return 2 /* Leaf */;
    }
    return 0 /* None */;
};
var fencedCodeBlock = function (parser) {
    var match;
    if (!parser.indented &&
        (match = parser.currentLine.slice(parser.nextNonspace).match(reCodeFence))) {
        var fenceLength = match[0].length;
        parser.closeUnmatchedBlocks();
        var container = parser.addChild('codeBlock', parser.nextNonspace);
        container.isFenced = true;
        container.fenceLength = fenceLength;
        container.fenceChar = match[0][0];
        container.fenceOffset = parser.indent;
        parser.advanceNextNonspace();
        parser.advanceOffset(fenceLength, false);
        return 2 /* Leaf */;
    }
    return 0 /* None */;
};
var htmlBlock = function (parser, container) {
    if (!parser.indented && peek(parser.currentLine, parser.nextNonspace) === C_LESSTHAN) {
        var s = parser.currentLine.slice(parser.nextNonspace);
        var disallowedTags = parser.options.disallowedHtmlBlockTags;
        var blockType = void 0;
        for (blockType = 1; blockType <= 7; blockType++) {
            var matched = s.match(reHtmlBlockOpen[blockType]);
            if (matched) {
                if (blockType === 7) {
                    if (container.type === 'paragraph') {
                        return 0 /* None */;
                    }
                    if (disallowedTags.length > 0) {
                        var reDisallowedTags = new RegExp("</?(?:" + disallowedTags.join('|') + ")", 'i');
                        if (reDisallowedTags.test(matched[0])) {
                            return 0 /* None */;
                        }
                    }
                }
                parser.closeUnmatchedBlocks();
                // We don't adjust parser.offset;
                // spaces are part of the HTML block:
                var b = parser.addChild('htmlBlock', parser.offset);
                b.htmlBlockType = blockType;
                return 2 /* Leaf */;
            }
        }
    }
    return 0 /* None */;
};
var seTextHeading = function (parser, container) {
    var match;
    if (container.stringContent !== null &&
        !parser.indented &&
        container.type === 'paragraph' &&
        // The nested Heading is disallowed in list and blockquote with 'disallowDeepHeading' option
        !isDisallowedDeepHeading(parser, container.parent) &&
        (match = parser.currentLine.slice(parser.nextNonspace).match(reSetextHeadingLine))) {
        parser.closeUnmatchedBlocks();
        // resolve reference link definitions
        var pos = void 0;
        while (peek(container.stringContent, 0) === C_OPEN_BRACKET &&
            (pos = parser.inlineParser.parseReference(container, parser.refMap))) {
            container.stringContent = container.stringContent.slice(pos);
        }
        if (container.stringContent.length > 0) {
            var heading = createNode('heading', container.sourcepos);
            heading.level = match[0][0] === '=' ? 1 : 2;
            heading.headingType = 'setext';
            heading.stringContent = container.stringContent;
            container.insertAfter(heading);
            container.unlink();
            parser.tip = heading;
            parser.advanceOffset(parser.currentLine.length - parser.offset, false);
            return 2 /* Leaf */;
        }
        return 0 /* None */;
    }
    return 0 /* None */;
};
var thematicBreak = function (parser) {
    if (!parser.indented && reThematicBreak.test(parser.currentLine.slice(parser.nextNonspace))) {
        parser.closeUnmatchedBlocks();
        parser.addChild('thematicBreak', parser.nextNonspace);
        parser.advanceOffset(parser.currentLine.length - parser.offset, false);
        return 2 /* Leaf */;
    }
    return 0 /* None */;
};
var listItem = function (parser, container) {
    var data;
    var currNode = container;
    if ((!parser.indented || container.type === 'list') &&
        (data = parseListMarker(parser, currNode))) {
        parser.closeUnmatchedBlocks();
        // add the list if needed
        if (parser.tip.type !== 'list' || !listsMatch(currNode.listData, data)) {
            currNode = parser.addChild('list', parser.nextNonspace);
            currNode.listData = data;
        }
        // add the list item
        currNode = parser.addChild('item', parser.nextNonspace);
        currNode.listData = data;
        return 1 /* Container */;
    }
    return 0 /* None */;
};
// indented code block
var indentedCodeBlock = function (parser) {
    if (parser.indented && parser.tip.type !== 'paragraph' && !parser.blank) {
        // indented code
        parser.advanceOffset(CODE_INDENT, true);
        parser.closeUnmatchedBlocks();
        parser.addChild('codeBlock', parser.offset);
        return 2 /* Leaf */;
    }
    return 0 /* None */;
};
var blockStarts = [
    blockQuote,
    atxHeading,
    fencedCodeBlock,
    htmlBlock,
    seTextHeading,
    thematicBreak,
    listItem,
    indentedCodeBlock,
    tableHead,
    tableBody,
    customBlock,
];

// `---` for YAML, `+++` for TOML, `;;;` for JSON
var reFrontMatter = /^(-{3}|\+{3}|;{3})$/;
var frontMatter$1 = function (parser, container) {
    var currentLine = parser.currentLine, lineNumber = parser.lineNumber, indented = parser.indented;
    if (lineNumber === 1 &&
        !indented &&
        container.type === 'document' &&
        reFrontMatter.test(currentLine)) {
        parser.closeUnmatchedBlocks();
        var frontMatter_1 = parser.addChild('frontMatter', parser.nextNonspace);
        frontMatter_1.stringContent = currentLine;
        parser.advanceNextNonspace();
        parser.advanceOffset(currentLine.length, false);
        return 2 /* Leaf */;
    }
    return 0 /* None */;
};

var frontMatter = {
    continue: function (parser, container) {
        var line = parser.currentLine;
        var match = line.match(reFrontMatter);
        if (container.type === 'frontMatter' && match) {
            container.stringContent += line;
            parser.lastLineLength = match[0].length;
            parser.finalize(container, parser.lineNumber);
            return 2 /* Finished */;
        }
        return 0 /* Go */;
    },
    finalize: function (_, block) {
        if (block.stringContent === null) {
            return;
        }
        block.literal = block.stringContent;
        block.stringContent = null;
    },
    canContain: function () {
        return false;
    },
    acceptsLines: true,
};

var reHtmlBlockClose = [
    /./,
    /<\/(?:script|pre|style)>/i,
    /-->/,
    /\?>/,
    />/,
    /\]\]>/,
];
var reMaybeSpecial = /^[#`~*+_=<>0-9-;$]/;
var reLineEnding$1 = /\r\n|\n|\r/;
function document() {
    return createNode('document', [
        [1, 1],
        [0, 0],
    ]);
}
var defaultOptions$1 = {
    smart: false,
    tagFilter: false,
    extendedAutolinks: false,
    disallowedHtmlBlockTags: [],
    referenceDefinition: false,
    disallowDeepHeading: false,
    customParser: null,
    frontMatter: false,
};
var Parser = /** @class */ (function () {
    function Parser(options) {
        this.options = __assign(__assign({}, defaultOptions$1), options);
        this.doc = document();
        this.tip = this.doc;
        this.oldtip = this.doc;
        this.lineNumber = 0;
        this.offset = 0;
        this.column = 0;
        this.nextNonspace = 0;
        this.nextNonspaceColumn = 0;
        this.indent = 0;
        this.currentLine = '';
        this.indented = false;
        this.blank = false;
        this.partiallyConsumedTab = false;
        this.allClosed = true;
        this.lastMatchedContainer = this.doc;
        this.refMap = {};
        this.refLinkCandidateMap = {};
        this.refDefCandidateMap = {};
        this.lastLineLength = 0;
        this.lines = [];
        if (this.options.frontMatter) {
            blockHandlers.frontMatter = frontMatter;
            blockStarts.unshift(frontMatter$1);
        }
        this.inlineParser = new InlineParser(this.options);
    }
    Parser.prototype.advanceOffset = function (count, columns) {
        if (columns === void 0) { columns = false; }
        var currentLine = this.currentLine;
        var charsToTab, charsToAdvance;
        var c;
        while (count > 0 && (c = currentLine[this.offset])) {
            if (c === '\t') {
                charsToTab = 4 - (this.column % 4);
                if (columns) {
                    this.partiallyConsumedTab = charsToTab > count;
                    charsToAdvance = charsToTab > count ? count : charsToTab;
                    this.column += charsToAdvance;
                    this.offset += this.partiallyConsumedTab ? 0 : 1;
                    count -= charsToAdvance;
                }
                else {
                    this.partiallyConsumedTab = false;
                    this.column += charsToTab;
                    this.offset += 1;
                    count -= 1;
                }
            }
            else {
                this.partiallyConsumedTab = false;
                this.offset += 1;
                this.column += 1; // assume ascii; block starts are ascii
                count -= 1;
            }
        }
    };
    Parser.prototype.advanceNextNonspace = function () {
        this.offset = this.nextNonspace;
        this.column = this.nextNonspaceColumn;
        this.partiallyConsumedTab = false;
    };
    Parser.prototype.findNextNonspace = function () {
        var currentLine = this.currentLine;
        var i = this.offset;
        var cols = this.column;
        var c;
        while ((c = currentLine.charAt(i)) !== '') {
            if (c === ' ') {
                i++;
                cols++;
            }
            else if (c === '\t') {
                i++;
                cols += 4 - (cols % 4);
            }
            else {
                break;
            }
        }
        this.blank = c === '\n' || c === '\r' || c === '';
        this.nextNonspace = i;
        this.nextNonspaceColumn = cols;
        this.indent = this.nextNonspaceColumn - this.column;
        this.indented = this.indent >= CODE_INDENT;
    };
    // Add a line to the block at the tip.  We assume the tip
    // can accept lines -- that check should be done before calling this.
    Parser.prototype.addLine = function () {
        if (this.partiallyConsumedTab) {
            this.offset += 1; // skip over tab
            // add space characters:
            var charsToTab = 4 - (this.column % 4);
            this.tip.stringContent += repeat(' ', charsToTab);
        }
        if (this.tip.lineOffsets) {
            this.tip.lineOffsets.push(this.offset);
        }
        else {
            this.tip.lineOffsets = [this.offset];
        }
        this.tip.stringContent += this.currentLine.slice(this.offset) + "\n";
    };
    // Add block of type tag as a child of the tip.  If the tip can't
    // accept children, close and finalize it and try its parent,
    // and so on til we find a block that can accept children.
    Parser.prototype.addChild = function (tag, offset) {
        while (!blockHandlers[this.tip.type].canContain(tag)) {
            this.finalize(this.tip, this.lineNumber - 1);
        }
        var columnNumber = offset + 1; // offset 0 = column 1
        var newBlock = createNode(tag, [
            [this.lineNumber, columnNumber],
            [0, 0],
        ]);
        newBlock.stringContent = '';
        this.tip.appendChild(newBlock);
        this.tip = newBlock;
        return newBlock;
    };
    // Finalize and close any unmatched blocks.
    Parser.prototype.closeUnmatchedBlocks = function () {
        if (!this.allClosed) {
            // finalize any blocks not matched
            while (this.oldtip !== this.lastMatchedContainer) {
                var parent_1 = this.oldtip.parent;
                this.finalize(this.oldtip, this.lineNumber - 1);
                this.oldtip = parent_1;
            }
            this.allClosed = true;
        }
    };
    // Finalize a block.  Close it and do any necessary postprocessing,
    // e.g. creating stringContent from strings, setting the 'tight'
    // or 'loose' status of a list, and parsing the beginnings
    // of paragraphs for reference definitions.  Reset the tip to the
    // parent of the closed block.
    Parser.prototype.finalize = function (block, lineNumber) {
        var above = block.parent;
        block.open = false;
        block.sourcepos[1] = [lineNumber, this.lastLineLength];
        blockHandlers[block.type].finalize(this, block);
        this.tip = above;
    };
    // Walk through a block & children recursively, parsing string content
    // into inline content where appropriate.
    Parser.prototype.processInlines = function (block) {
        var event;
        var customParser = this.options.customParser;
        var walker = block.walker();
        this.inlineParser.refMap = this.refMap;
        this.inlineParser.refLinkCandidateMap = this.refLinkCandidateMap;
        this.inlineParser.refDefCandidateMap = this.refDefCandidateMap;
        this.inlineParser.options = this.options;
        while ((event = walker.next())) {
            var node = event.node, entering = event.entering;
            var t = node.type;
            if (customParser && customParser[t]) {
                customParser[t](node, { entering: entering, options: this.options });
            }
            if (!entering &&
                (t === 'paragraph' ||
                    t === 'heading' ||
                    (t === 'tableCell' && !node.ignored))) {
                this.inlineParser.parse(node);
            }
        }
    };
    // Analyze a line of text and update the document appropriately.
    // We parse markdown text by calling this on each line of input,
    // then finalizing the document.
    Parser.prototype.incorporateLine = function (ln) {
        var container = this.doc;
        this.oldtip = this.tip;
        this.offset = 0;
        this.column = 0;
        this.blank = false;
        this.partiallyConsumedTab = false;
        this.lineNumber += 1;
        // replace NUL characters for security
        if (ln.indexOf('\u0000') !== -1) {
            ln = ln.replace(/\0/g, '\uFFFD');
        }
        this.currentLine = ln;
        // For each containing block, try to parse the associated line start.
        // Bail out on failure: container will point to the last matching block.
        // Set allMatched to false if not all containers match.
        var allMatched = true;
        var lastChild;
        while ((lastChild = container.lastChild) && lastChild.open) {
            container = lastChild;
            this.findNextNonspace();
            switch (blockHandlers[container.type]['continue'](this, container)) {
                case 0 /* Go */: // we've matched, keep going
                    break;
                case 1 /* Stop */: // we've failed to match a block
                    allMatched = false;
                    break;
                case 2 /* Finished */: // we've hit end of line for fenced code close and can return
                    this.lastLineLength = ln.length;
                    return;
                default:
                    throw new Error('continue returned illegal value, must be 0, 1, or 2');
            }
            if (!allMatched) {
                container = container.parent; // back up to last matching block
                break;
            }
        }
        this.allClosed = container === this.oldtip;
        this.lastMatchedContainer = container;
        var matchedLeaf = container.type !== 'paragraph' && blockHandlers[container.type].acceptsLines;
        var blockStartsLen = blockStarts.length;
        // Unless last matched container is a code block, try new container starts,
        // adding children to the last matched container:
        while (!matchedLeaf) {
            this.findNextNonspace();
            // this is a little performance optimization:
            if (container.type !== 'table' &&
                container.type !== 'tableBody' &&
                container.type !== 'paragraph' &&
                !this.indented &&
                !reMaybeSpecial.test(ln.slice(this.nextNonspace))) {
                this.advanceNextNonspace();
                break;
            }
            var i = 0;
            while (i < blockStartsLen) {
                var res = blockStarts[i](this, container);
                if (res === 1 /* Container */) {
                    container = this.tip;
                    break;
                }
                else if (res === 2 /* Leaf */) {
                    container = this.tip;
                    matchedLeaf = true;
                    break;
                }
                else {
                    i++;
                }
            }
            if (i === blockStartsLen) {
                // nothing matched
                this.advanceNextNonspace();
                break;
            }
        }
        // What remains at the offset is a text line.  Add the text to the
        // appropriate container.
        // First check for a lazy paragraph continuation:
        if (!this.allClosed && !this.blank && this.tip.type === 'paragraph') {
            // lazy paragraph continuation
            this.addLine();
        }
        else {
            // not a lazy continuation
            // finalize any blocks not matched
            this.closeUnmatchedBlocks();
            if (this.blank && container.lastChild) {
                container.lastChild.lastLineBlank = true;
            }
            var t = container.type;
            // Block quote lines are never blank as they start with >
            // and we don't count blanks in fenced code for purposes of tight/loose
            // lists or breaking out of lists. We also don't set _lastLineBlank
            // on an empty list item, or if we just closed a fenced block.
            var lastLineBlank = this.blank &&
                !(t === 'blockQuote' ||
                    (isCodeBlock(container) && container.isFenced) ||
                    (t === 'item' && !container.firstChild && container.sourcepos[0][0] === this.lineNumber));
            // propagate lastLineBlank up through parents:
            var cont = container;
            while (cont) {
                cont.lastLineBlank = lastLineBlank;
                cont = cont.parent;
            }
            if (blockHandlers[t].acceptsLines) {
                this.addLine();
                // if HtmlBlock, check for end condition
                if (isHtmlBlock(container) &&
                    container.htmlBlockType >= 1 &&
                    container.htmlBlockType <= 5 &&
                    reHtmlBlockClose[container.htmlBlockType].test(this.currentLine.slice(this.offset))) {
                    this.lastLineLength = ln.length;
                    this.finalize(container, this.lineNumber);
                }
            }
            else if (this.offset < ln.length && !this.blank) {
                // create paragraph container for line
                container = this.addChild('paragraph', this.offset);
                this.advanceNextNonspace();
                this.addLine();
            }
        }
        this.lastLineLength = ln.length;
    };
    // The main parsing function.  Returns a parsed document AST.
    Parser.prototype.parse = function (input, lineTexts) {
        this.doc = document();
        this.tip = this.doc;
        this.lineNumber = 0;
        this.lastLineLength = 0;
        this.offset = 0;
        this.column = 0;
        this.lastMatchedContainer = this.doc;
        this.currentLine = '';
        var lines = input.split(reLineEnding$1);
        var len = lines.length;
        this.lines = lineTexts ? lineTexts : lines;
        if (this.options.referenceDefinition) {
            this.clearRefMaps();
        }
        if (input.charCodeAt(input.length - 1) === C_NEWLINE) {
            // ignore last blank line created by final newline
            len -= 1;
        }
        for (var i = 0; i < len; i++) {
            this.incorporateLine(lines[i]);
        }
        while (this.tip) {
            this.finalize(this.tip, len);
        }
        this.processInlines(this.doc);
        return this.doc;
    };
    Parser.prototype.partialParseStart = function (lineNumber, lines) {
        this.doc = document();
        this.tip = this.doc;
        this.lineNumber = lineNumber - 1;
        this.lastLineLength = 0;
        this.offset = 0;
        this.column = 0;
        this.lastMatchedContainer = this.doc;
        this.currentLine = '';
        var len = lines.length;
        for (var i = 0; i < len; i++) {
            this.incorporateLine(lines[i]);
        }
        return this.doc;
    };
    Parser.prototype.partialParseExtends = function (lines) {
        for (var i = 0; i < lines.length; i++) {
            this.incorporateLine(lines[i]);
        }
    };
    Parser.prototype.partialParseFinish = function () {
        while (this.tip) {
            this.finalize(this.tip, this.lineNumber);
        }
        this.processInlines(this.doc);
    };
    Parser.prototype.setRefMaps = function (refMap, refLinkCandidateMap, refDefCandidateMap) {
        this.refMap = refMap;
        this.refLinkCandidateMap = refLinkCandidateMap;
        this.refDefCandidateMap = refDefCandidateMap;
    };
    Parser.prototype.clearRefMaps = function () {
        [this.refMap, this.refLinkCandidateMap, this.refDefCandidateMap].forEach(function (map) {
            clearObj(map);
        });
    };
    return Parser;
}());

function comparePos(p1, p2) {
    if (p1[0] < p2[0]) {
        return 1 /* LT */;
    }
    if (p1[0] > p2[0]) {
        return -1 /* GT */;
    }
    if (p1[1] < p2[1]) {
        return 1 /* LT */;
    }
    if (p1[1] > p2[1]) {
        return -1 /* GT */;
    }
    return 0 /* EQ */;
}
function compareRangeAndPos(_a, pos) {
    var startPos = _a[0], endPos = _a[1];
    if (comparePos(endPos, pos) === 1 /* LT */) {
        return 1 /* LT */;
    }
    if (comparePos(startPos, pos) === -1 /* GT */) {
        return -1 /* GT */;
    }
    return 0 /* EQ */;
}
function removeNextUntil(node, last) {
    if (node.parent !== last.parent || node === last) {
        return;
    }
    var next = node.next;
    while (next && next !== last) {
        var temp = next.next;
        for (var _i = 0, _a = ['parent', 'prev', 'next']; _i < _a.length; _i++) {
            var type = _a[_i];
            if (next[type]) {
                removeNodeById(next[type].id);
                next[type] = null;
            }
        }
        next = temp;
    }
    node.next = last.next;
    if (last.next) {
        last.next.prev = node;
    }
    else {
        node.parent.lastChild = node;
    }
}
function getChildNodes(parent) {
    var nodes = [];
    var curr = parent.firstChild;
    while (curr) {
        nodes.push(curr);
        curr = curr.next;
    }
    return nodes;
}
function insertNodesBefore(target, nodes) {
    for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
        var node = nodes_1[_i];
        target.insertBefore(node);
    }
}
function prependChildNodes(parent, nodes) {
    for (var i = nodes.length - 1; i >= 0; i -= 1) {
        parent.prependChild(nodes[i]);
    }
}
function updateNextLineNumbers(base, diff) {
    if (!base || !base.parent || diff === 0) {
        return;
    }
    var walker = base.parent.walker();
    walker.resumeAt(base, true);
    var event;
    while ((event = walker.next())) {
        var node = event.node, entering = event.entering;
        if (entering) {
            node.sourcepos[0][0] += diff;
            node.sourcepos[1][0] += diff;
        }
    }
}
function compareRangeAndLine(_a, line) {
    var startPos = _a[0], endPos = _a[1];
    if (endPos[0] < line) {
        return 1 /* LT */;
    }
    if (startPos[0] > line) {
        return -1 /* GT */;
    }
    return 0 /* EQ */;
}
function findChildNodeAtLine(parent, line) {
    var node = parent.firstChild;
    while (node) {
        var comp = compareRangeAndLine(node.sourcepos, line);
        if (comp === 0 /* EQ */) {
            return node;
        }
        if (comp === -1 /* GT */) {
            // To consider that top line is blank line
            return node.prev || node;
        }
        node = node.next;
    }
    return parent.lastChild;
}
function lastLeafNode(node) {
    while (node.lastChild) {
        node = node.lastChild;
    }
    return node;
}
function sameLineTopAncestor(node) {
    while (node.parent &&
        node.parent.type !== 'document' &&
        node.parent.sourcepos[0][0] === node.sourcepos[0][0]) {
        node = node.parent;
    }
    return node;
}
function findFirstNodeAtLine(parent, line) {
    var node = parent.firstChild;
    var prev = null;
    while (node) {
        var comp = compareRangeAndLine(node.sourcepos, line);
        if (comp === 0 /* EQ */) {
            if (node.sourcepos[0][0] === line || !node.firstChild) {
                return node;
            }
            prev = node;
            node = node.firstChild;
        }
        else if (comp === -1 /* GT */) {
            break;
        }
        else {
            prev = node;
            node = node.next;
        }
    }
    if (prev) {
        return sameLineTopAncestor(lastLeafNode(prev));
    }
    return null;
}
function findNodeAtPosition(parent, pos) {
    var node = parent;
    var prev = null;
    while (node) {
        var comp = compareRangeAndPos(node.sourcepos, pos);
        if (comp === 0 /* EQ */) {
            if (node.firstChild) {
                prev = node;
                node = node.firstChild;
            }
            else {
                return node;
            }
        }
        else if (comp === -1 /* GT */) {
            return prev;
        }
        else if (node.next) {
            node = node.next;
        }
        else {
            return prev;
        }
    }
    return node;
}
function findNodeById(id) {
    return getNodeById(id) || null;
}
function invokeNextUntil(callback, start, end) {
    if (end === void 0) { end = null; }
    if (start) {
        var walker = start.walker();
        while (start && start !== end) {
            callback(start);
            var next = walker.next();
            if (next) {
                start = next.node;
            }
            else {
                break;
            }
        }
    }
}
function isUnlinked(id) {
    var node = findNodeById(id);
    if (!node) {
        return true;
    }
    while (node && node.type !== 'document') {
        // eslint-disable-next-line no-loop-func
        if (!node.parent && !node.prev && !node.next) {
            return true;
        }
        node = node.parent;
    }
    return false;
}

var reLineEnding = /\r\n|\n|\r/;
function canBeContinuedListItem(lineText) {
    var spaceMatch = lineText.match(/^[ \t]+/);
    if (spaceMatch && (spaceMatch[0].length >= 2 || /\t/.test(spaceMatch[0]))) {
        return true;
    }
    var leftTrimmed = spaceMatch ? lineText.slice(spaceMatch.length) : lineText;
    return reBulletListMarker.test(leftTrimmed) || reOrderedListMarker.test(leftTrimmed);
}
function canBeContinuedTableBody(lineText) {
    return !isBlank(lineText) && lineText.indexOf('|') !== -1;
}
function createRefDefState(node) {
    var id = node.id, title = node.title, sourcepos = node.sourcepos, dest = node.dest;
    return {
        id: id,
        title: title,
        sourcepos: sourcepos,
        unlinked: false,
        destination: dest,
    };
}
var ToastMark = /** @class */ (function () {
    function ToastMark(contents, options) {
        this.refMap = {};
        this.refLinkCandidateMap = {};
        this.refDefCandidateMap = {};
        this.referenceDefinition = !!(options === null || options === void 0 ? void 0 : options.referenceDefinition);
        this.parser = new Parser(options);
        this.parser.setRefMaps(this.refMap, this.refLinkCandidateMap, this.refDefCandidateMap);
        this.eventHandlerMap = { change: [] };
        contents = contents || '';
        this.lineTexts = contents.split(reLineEnding);
        this.root = this.parser.parse(contents, this.lineTexts);
    }
    ToastMark.prototype.updateLineTexts = function (startPos, endPos, newText) {
        var _a;
        var startLine = startPos[0], startCol = startPos[1];
        var endLine = endPos[0], endCol = endPos[1];
        var newLines = newText.split(reLineEnding);
        var newLineLen = newLines.length;
        var startLineText = this.lineTexts[startLine - 1];
        var endLineText = this.lineTexts[endLine - 1];
        newLines[0] = startLineText.slice(0, startCol - 1) + newLines[0];
        newLines[newLineLen - 1] = newLines[newLineLen - 1] + endLineText.slice(endCol - 1);
        var removedLineLen = endLine - startLine + 1;
        (_a = this.lineTexts).splice.apply(_a, __spreadArray([startLine - 1, removedLineLen], newLines));
        return newLineLen - removedLineLen;
    };
    ToastMark.prototype.updateRootNodeState = function () {
        if (this.lineTexts.length === 1 && this.lineTexts[0] === '') {
            this.root.lastLineBlank = true;
            this.root.sourcepos = [
                [1, 1],
                [1, 0],
            ];
            return;
        }
        if (this.root.lastChild) {
            this.root.lastLineBlank = this.root.lastChild.lastLineBlank;
        }
        var lineTexts = this.lineTexts;
        var idx = lineTexts.length - 1;
        while (lineTexts[idx] === '') {
            idx -= 1;
        }
        if (lineTexts.length - 2 > idx) {
            idx += 1;
        }
        this.root.sourcepos[1] = [idx + 1, lineTexts[idx].length];
    };
    ToastMark.prototype.replaceRangeNodes = function (startNode, endNode, newNodes) {
        if (!startNode) {
            if (endNode) {
                insertNodesBefore(endNode, newNodes);
                removeNodeById(endNode.id);
                endNode.unlink();
            }
            else {
                prependChildNodes(this.root, newNodes);
            }
        }
        else {
            insertNodesBefore(startNode, newNodes);
            removeNextUntil(startNode, endNode);
            [startNode.id, endNode.id].forEach(function (id) { return removeNodeById(id); });
            startNode.unlink();
        }
    };
    ToastMark.prototype.getNodeRange = function (startPos, endPos) {
        var startNode = findChildNodeAtLine(this.root, startPos[0]);
        var endNode = findChildNodeAtLine(this.root, endPos[0]);
        // extend node range to include a following block which doesn't have preceding blank line
        if (endNode && endNode.next && endPos[0] + 1 === endNode.next.sourcepos[0][0]) {
            endNode = endNode.next;
        }
        return [startNode, endNode];
    };
    ToastMark.prototype.trigger = function (eventName, param) {
        this.eventHandlerMap[eventName].forEach(function (handler) {
            handler(param);
        });
    };
    ToastMark.prototype.extendEndLine = function (line) {
        while (this.lineTexts[line] === '') {
            line += 1;
        }
        return line;
    };
    ToastMark.prototype.parseRange = function (startNode, endNode, startLine, endLine) {
        // extends starting range if the first node can be a continued list item
        if (startNode &&
            startNode.prev &&
            ((isList(startNode.prev) && canBeContinuedListItem(this.lineTexts[startLine - 1])) ||
                (isTable(startNode.prev) && canBeContinuedTableBody(this.lineTexts[startLine - 1])))) {
            startNode = startNode.prev;
            startLine = startNode.sourcepos[0][0];
        }
        var editedLines = this.lineTexts.slice(startLine - 1, endLine);
        var root = this.parser.partialParseStart(startLine, editedLines);
        // extends ending range if the following node can be a fenced code block or a continued list item
        var nextNode = endNode ? endNode.next : this.root.firstChild;
        var lastChild = root.lastChild;
        var isOpenedLastChildCodeBlock = lastChild && isCodeBlock(lastChild) && lastChild.open;
        var isOpenedLastChildCustomBlock = lastChild && isCustomBlock(lastChild) && lastChild.open;
        var isLastChildList = lastChild && isList(lastChild);
        while (((isOpenedLastChildCodeBlock || isOpenedLastChildCustomBlock) && nextNode) ||
            (isLastChildList && nextNode && (nextNode.type === 'list' || nextNode.sourcepos[0][1] >= 2))) {
            var newEndLine = this.extendEndLine(nextNode.sourcepos[1][0]);
            this.parser.partialParseExtends(this.lineTexts.slice(endLine, newEndLine));
            if (!startNode) {
                startNode = endNode;
            }
            endNode = nextNode;
            endLine = newEndLine;
            nextNode = nextNode.next;
        }
        this.parser.partialParseFinish();
        var newNodes = getChildNodes(root);
        return { newNodes: newNodes, extStartNode: startNode, extEndNode: endNode };
    };
    ToastMark.prototype.getRemovedNodeRange = function (extStartNode, extEndNode) {
        if (!extStartNode ||
            (extStartNode && isRefDef(extStartNode)) ||
            (extEndNode && isRefDef(extEndNode))) {
            return null;
        }
        return {
            id: [extStartNode.id, extEndNode.id],
            line: [extStartNode.sourcepos[0][0] - 1, extEndNode.sourcepos[1][0] - 1],
        };
    };
    ToastMark.prototype.markDeletedRefMap = function (extStartNode, extEndNode) {
        var _this = this;
        if (!isEmptyObj(this.refMap)) {
            var markDeleted = function (node) {
                if (isRefDef(node)) {
                    var refDefState = _this.refMap[node.label];
                    if (refDefState && node.id === refDefState.id) {
                        refDefState.unlinked = true;
                    }
                }
            };
            if (extStartNode) {
                invokeNextUntil(markDeleted, extStartNode.parent, extEndNode);
            }
            if (extEndNode) {
                invokeNextUntil(markDeleted, extEndNode);
            }
        }
    };
    ToastMark.prototype.replaceWithNewRefDefState = function (nodes) {
        var _this = this;
        if (!isEmptyObj(this.refMap)) {
            var replaceWith_1 = function (node) {
                if (isRefDef(node)) {
                    var label = node.label;
                    var refDefState = _this.refMap[label];
                    if (!refDefState || refDefState.unlinked) {
                        _this.refMap[label] = createRefDefState(node);
                    }
                }
            };
            nodes.forEach(function (node) {
                invokeNextUntil(replaceWith_1, node);
            });
        }
    };
    ToastMark.prototype.replaceWithRefDefCandidate = function () {
        var _this = this;
        if (!isEmptyObj(this.refDefCandidateMap)) {
            iterateObject(this.refDefCandidateMap, function (_, candidate) {
                var label = candidate.label, sourcepos = candidate.sourcepos;
                var refDefState = _this.refMap[label];
                if (!refDefState ||
                    refDefState.unlinked ||
                    refDefState.sourcepos[0][0] > sourcepos[0][0]) {
                    _this.refMap[label] = createRefDefState(candidate);
                }
            });
        }
    };
    ToastMark.prototype.getRangeWithRefDef = function (startLine, endLine, startNode, endNode, lineDiff) {
        if (this.referenceDefinition && !isEmptyObj(this.refMap)) {
            var prevNode = findChildNodeAtLine(this.root, startLine - 1);
            var nextNode = findChildNodeAtLine(this.root, endLine + 1);
            if (prevNode && isRefDef(prevNode) && prevNode !== startNode && prevNode !== endNode) {
                startNode = prevNode;
                startLine = startNode.sourcepos[0][0];
            }
            if (nextNode && isRefDef(nextNode) && nextNode !== startNode && nextNode !== endNode) {
                endNode = nextNode;
                endLine = this.extendEndLine(endNode.sourcepos[1][0] + lineDiff);
            }
        }
        return [startNode, endNode, startLine, endLine];
    };
    ToastMark.prototype.parse = function (startPos, endPos, lineDiff) {
        if (lineDiff === void 0) { lineDiff = 0; }
        var range = this.getNodeRange(startPos, endPos);
        var startNode = range[0], endNode = range[1];
        var startLine = startNode ? Math.min(startNode.sourcepos[0][0], startPos[0]) : startPos[0];
        var endLine = this.extendEndLine((endNode ? Math.max(endNode.sourcepos[1][0], endPos[0]) : endPos[0]) + lineDiff);
        var parseResult = this.parseRange.apply(this, this.getRangeWithRefDef(startLine, endLine, startNode, endNode, lineDiff));
        var newNodes = parseResult.newNodes, extStartNode = parseResult.extStartNode, extEndNode = parseResult.extEndNode;
        var removedNodeRange = this.getRemovedNodeRange(extStartNode, extEndNode);
        var nextNode = extEndNode ? extEndNode.next : this.root.firstChild;
        if (this.referenceDefinition) {
            this.markDeletedRefMap(extStartNode, extEndNode);
            this.replaceRangeNodes(extStartNode, extEndNode, newNodes);
            this.replaceWithNewRefDefState(newNodes);
        }
        else {
            this.replaceRangeNodes(extStartNode, extEndNode, newNodes);
        }
        return { nodes: newNodes, removedNodeRange: removedNodeRange, nextNode: nextNode };
    };
    ToastMark.prototype.parseRefLink = function () {
        var _this = this;
        var result = [];
        if (!isEmptyObj(this.refMap)) {
            iterateObject(this.refMap, function (label, value) {
                if (value.unlinked) {
                    delete _this.refMap[label];
                }
                iterateObject(_this.refLinkCandidateMap, function (_, candidate) {
                    var node = candidate.node, refLabel = candidate.refLabel;
                    if (refLabel === label) {
                        result.push(_this.parse(node.sourcepos[0], node.sourcepos[1]));
                    }
                });
            });
        }
        return result;
    };
    ToastMark.prototype.removeUnlinkedCandidate = function () {
        if (!isEmptyObj(this.refDefCandidateMap)) {
            [this.refLinkCandidateMap, this.refDefCandidateMap].forEach(function (candidateMap) {
                iterateObject(candidateMap, function (id) {
                    if (isUnlinked(id)) {
                        delete candidateMap[id];
                    }
                });
            });
        }
    };
    ToastMark.prototype.editMarkdown = function (startPos, endPos, newText) {
        var lineDiff = this.updateLineTexts(startPos, endPos, newText);
        var parseResult = this.parse(startPos, endPos, lineDiff);
        var editResult = omit(parseResult, 'nextNode');
        updateNextLineNumbers(parseResult.nextNode, lineDiff);
        this.updateRootNodeState();
        var result = [editResult];
        if (this.referenceDefinition) {
            this.removeUnlinkedCandidate();
            this.replaceWithRefDefCandidate();
            result = result.concat(this.parseRefLink());
        }
        this.trigger('change', result);
        return result;
    };
    ToastMark.prototype.getLineTexts = function () {
        return this.lineTexts;
    };
    ToastMark.prototype.getRootNode = function () {
        return this.root;
    };
    ToastMark.prototype.findNodeAtPosition = function (pos) {
        var node = findNodeAtPosition(this.root, pos);
        if (!node || node === this.root) {
            return null;
        }
        return node;
    };
    ToastMark.prototype.findFirstNodeAtLine = function (line) {
        return findFirstNodeAtLine(this.root, line);
    };
    ToastMark.prototype.on = function (eventName, callback) {
        this.eventHandlerMap[eventName].push(callback);
    };
    ToastMark.prototype.off = function (eventName, callback) {
        var handlers = this.eventHandlerMap[eventName];
        var idx = handlers.indexOf(callback);
        handlers.splice(idx, 1);
    };
    ToastMark.prototype.findNodeById = function (id) {
        return findNodeById(id);
    };
    ToastMark.prototype.removeAllNode = function () {
        removeAllNode();
    };
    return ToastMark;
}());

var disallowedTags = [
    'title',
    'textarea',
    'style',
    'xmp',
    'iframe',
    'noembed',
    'noframes',
    'script',
    'plaintext',
];
var reDisallowedTag = new RegExp("<(/?(?:" + disallowedTags.join('|') + ")[^>]*>)", 'ig');
function filterDisallowedTags(str) {
    if (reDisallowedTag.test(str)) {
        return str.replace(reDisallowedTag, function (_, group) { return "&lt;" + group; });
    }
    return str;
}

var baseConvertors = {
    heading: function (node, _a) {
        var entering = _a.entering;
        return {
            type: entering ? 'openTag' : 'closeTag',
            tagName: "h" + node.level,
            outerNewLine: true,
        };
    },
    text: function (node) {
        return {
            type: 'text',
            content: node.literal,
        };
    },
    softbreak: function (_, _a) {
        var options = _a.options;
        return {
            type: 'html',
            content: options.softbreak,
        };
    },
    linebreak: function () {
        return {
            type: 'html',
            content: '<br />\n',
        };
    },
    emph: function (_, _a) {
        var entering = _a.entering;
        return {
            type: entering ? 'openTag' : 'closeTag',
            tagName: 'em',
        };
    },
    strong: function (_, _a) {
        var entering = _a.entering;
        return {
            type: entering ? 'openTag' : 'closeTag',
            tagName: 'strong',
        };
    },
    paragraph: function (node, _a) {
        var _b;
        var entering = _a.entering;
        var grandparent = (_b = node.parent) === null || _b === void 0 ? void 0 : _b.parent;
        if (grandparent && grandparent.type === 'list') {
            if (grandparent.listData.tight) {
                return null;
            }
        }
        return {
            type: entering ? 'openTag' : 'closeTag',
            tagName: 'p',
            outerNewLine: true,
        };
    },
    thematicBreak: function () {
        return {
            type: 'openTag',
            tagName: 'hr',
            outerNewLine: true,
            selfClose: true,
        };
    },
    blockQuote: function (_, _a) {
        var entering = _a.entering;
        return {
            type: entering ? 'openTag' : 'closeTag',
            tagName: 'blockquote',
            outerNewLine: true,
            innerNewLine: true,
        };
    },
    list: function (node, _a) {
        var entering = _a.entering;
        var _b = node.listData, type = _b.type, start = _b.start;
        var tagName = type === 'bullet' ? 'ul' : 'ol';
        var attributes = {};
        if (tagName === 'ol' && start !== null && start !== 1) {
            attributes.start = start.toString();
        }
        return {
            type: entering ? 'openTag' : 'closeTag',
            tagName: tagName,
            attributes: attributes,
            outerNewLine: true,
        };
    },
    item: function (_, _a) {
        var entering = _a.entering;
        return {
            type: entering ? 'openTag' : 'closeTag',
            tagName: 'li',
            outerNewLine: true,
        };
    },
    htmlInline: function (node, _a) {
        var options = _a.options;
        var content = options.tagFilter ? filterDisallowedTags(node.literal) : node.literal;
        return { type: 'html', content: content };
    },
    htmlBlock: function (node, _a) {
        var options = _a.options;
        var content = options.tagFilter ? filterDisallowedTags(node.literal) : node.literal;
        if (options.nodeId) {
            return [
                { type: 'openTag', tagName: 'div', outerNewLine: true },
                { type: 'html', content: content },
                { type: 'closeTag', tagName: 'div', outerNewLine: true },
            ];
        }
        return { type: 'html', content: content, outerNewLine: true };
    },
    code: function (node) {
        return [
            { type: 'openTag', tagName: 'code' },
            { type: 'text', content: node.literal },
            { type: 'closeTag', tagName: 'code' },
        ];
    },
    codeBlock: function (node) {
        var infoStr = node.info;
        var infoWords = infoStr ? infoStr.split(/\s+/) : [];
        var codeClassNames = [];
        if (infoWords.length > 0 && infoWords[0].length > 0) {
            codeClassNames.push("language-" + escapeXml(infoWords[0]));
        }
        return [
            { type: 'openTag', tagName: 'pre', outerNewLine: true },
            { type: 'openTag', tagName: 'code', classNames: codeClassNames },
            { type: 'text', content: node.literal },
            { type: 'closeTag', tagName: 'code' },
            { type: 'closeTag', tagName: 'pre', outerNewLine: true },
        ];
    },
    link: function (node, _a) {
        var entering = _a.entering;
        if (entering) {
            var _b = node, title = _b.title, destination = _b.destination;
            return {
                type: 'openTag',
                tagName: 'a',
                attributes: __assign({ href: escapeXml(destination) }, (title && { title: escapeXml(title) })),
            };
        }
        return { type: 'closeTag', tagName: 'a' };
    },
    image: function (node, _a) {
        var getChildrenText = _a.getChildrenText, skipChildren = _a.skipChildren;
        var _b = node, title = _b.title, destination = _b.destination;
        skipChildren();
        return {
            type: 'openTag',
            tagName: 'img',
            selfClose: true,
            attributes: __assign({ src: escapeXml(destination), alt: getChildrenText(node) }, (title && { title: escapeXml(title) })),
        };
    },
    customBlock: function (node, context, convertors) {
        var info = node.info.trim().toLowerCase();
        var customConvertor = convertors[info];
        if (customConvertor) {
            try {
                return customConvertor(node, context);
            }
            catch (e) {
                console.warn("[@toast-ui/editor] - The error occurred when " + info + " block node was parsed in markdown renderer: " + e);
            }
        }
        return [
            { type: 'openTag', tagName: 'div', outerNewLine: true },
            { type: 'text', content: node.literal },
            { type: 'closeTag', tagName: 'div', outerNewLine: true },
        ];
    },
    frontMatter: function (node) {
        return [
            {
                type: 'openTag',
                tagName: 'div',
                outerNewLine: true,
                // Because front matter is metadata, it should not be render.
                attributes: { style: 'white-space: pre; display: none;' },
            },
            { type: 'text', content: node.literal },
            { type: 'closeTag', tagName: 'div', outerNewLine: true },
        ];
    },
    customInline: function (node, context, convertors) {
        var _a = node, info = _a.info, firstChild = _a.firstChild;
        var nomalizedInfo = info.trim().toLowerCase();
        var customConvertor = convertors[nomalizedInfo];
        var entering = context.entering;
        if (customConvertor) {
            try {
                return customConvertor(node, context);
            }
            catch (e) {
                console.warn("[@toast-ui/editor] - The error occurred when " + nomalizedInfo + " inline node was parsed in markdown renderer: " + e);
            }
        }
        return entering
            ? [
                { type: 'openTag', tagName: 'span' },
                { type: 'text', content: "$$" + info + (firstChild ? ' ' : '') },
            ]
            : [
                { type: 'text', content: '$$' },
                { type: 'closeTag', tagName: 'span' },
            ];
    },
};

var gfmConvertors = {
    strike: function (_, _a) {
        var entering = _a.entering;
        return {
            type: entering ? 'openTag' : 'closeTag',
            tagName: 'del',
        };
    },
    item: function (node, _a) {
        var entering = _a.entering;
        var _b = node.listData, checked = _b.checked, task = _b.task;
        if (entering) {
            var itemTag = {
                type: 'openTag',
                tagName: 'li',
                outerNewLine: true,
            };
            if (task) {
                return [
                    itemTag,
                    {
                        type: 'openTag',
                        tagName: 'input',
                        selfClose: true,
                        attributes: __assign(__assign({}, (checked && { checked: '' })), { disabled: '', type: 'checkbox' }),
                    },
                    {
                        type: 'text',
                        content: ' ',
                    },
                ];
            }
            return itemTag;
        }
        return {
            type: 'closeTag',
            tagName: 'li',
            outerNewLine: true,
        };
    },
    table: function (_, _a) {
        var entering = _a.entering;
        return {
            type: entering ? 'openTag' : 'closeTag',
            tagName: 'table',
            outerNewLine: true,
        };
    },
    tableHead: function (_, _a) {
        var entering = _a.entering;
        return {
            type: entering ? 'openTag' : 'closeTag',
            tagName: 'thead',
            outerNewLine: true,
        };
    },
    tableBody: function (_, _a) {
        var entering = _a.entering;
        return {
            type: entering ? 'openTag' : 'closeTag',
            tagName: 'tbody',
            outerNewLine: true,
        };
    },
    tableRow: function (node, _a) {
        var entering = _a.entering;
        if (entering) {
            return {
                type: 'openTag',
                tagName: 'tr',
                outerNewLine: true,
            };
        }
        var result = [];
        if (node.lastChild) {
            var columnLen = node.parent.parent.columns.length;
            var lastColIdx = node.lastChild.endIdx;
            for (var i = lastColIdx + 1; i < columnLen; i += 1) {
                result.push({
                    type: 'openTag',
                    tagName: 'td',
                    outerNewLine: true,
                }, {
                    type: 'closeTag',
                    tagName: 'td',
                    outerNewLine: true,
                });
            }
        }
        result.push({
            type: 'closeTag',
            tagName: 'tr',
            outerNewLine: true,
        });
        return result;
    },
    tableCell: function (node, _a) {
        var entering = _a.entering;
        if (node.ignored) {
            return {
                type: 'text',
                content: '',
            };
        }
        var tablePart = node.parent.parent;
        var tagName = tablePart.type === 'tableHead' ? 'th' : 'td';
        var table = tablePart.parent;
        var columnInfo = table.columns[node.startIdx];
        var attributes = (columnInfo === null || columnInfo === void 0 ? void 0 : columnInfo.align) ? { align: columnInfo.align } : null;
        if (entering) {
            return __assign({ type: 'openTag', tagName: tagName, outerNewLine: true }, (attributes && { attributes: attributes }));
        }
        return {
            type: 'closeTag',
            tagName: tagName,
            outerNewLine: true,
        };
    },
};

var defaultOptions = {
    softbreak: '\n',
    gfm: false,
    tagFilter: false,
    nodeId: false,
};
function getChildrenText(node) {
    var buffer = [];
    var walker = node.walker();
    var event = null;
    while ((event = walker.next())) {
        var node_1 = event.node;
        if (node_1.type === 'text') {
            buffer.push(node_1.literal);
        }
    }
    return buffer.join('');
}
var Renderer = /** @class */ (function () {
    function Renderer(customOptions) {
        this.buffer = [];
        this.options = __assign(__assign({}, defaultOptions), customOptions);
        this.convertors = this.createConvertors();
        delete this.options.convertors;
    }
    Renderer.prototype.createConvertors = function () {
        var convertors = __assign({}, baseConvertors);
        if (this.options.gfm) {
            convertors = __assign(__assign({}, convertors), gfmConvertors);
        }
        if (this.options.convertors) {
            var customConvertors_1 = this.options.convertors;
            var nodeTypes = Object.keys(customConvertors_1);
            var defaultConvertors_1 = __assign(__assign({}, baseConvertors), gfmConvertors);
            nodeTypes.forEach(function (nodeType) {
                var orgConvertor = convertors[nodeType];
                var convertor = customConvertors_1[nodeType];
                var convertorType = Object.keys(defaultConvertors_1).indexOf(nodeType) === -1
                    ? nodeType.toLowerCase()
                    : nodeType;
                if (orgConvertor) {
                    convertors[convertorType] = function (node, context, convertors) {
                        context.origin = function () { return orgConvertor(node, context, convertors); };
                        return convertor(node, context);
                    };
                }
                else {
                    convertors[convertorType] = convertor;
                }
            });
        }
        return convertors;
    };
    Renderer.prototype.getConvertors = function () {
        return this.convertors;
    };
    Renderer.prototype.getOptions = function () {
        return this.options;
    };
    Renderer.prototype.render = function (rootNode) {
        var _this = this;
        this.buffer = [];
        var walker = rootNode.walker();
        var event = null;
        var _loop_1 = function () {
            var node = event.node, entering = event.entering;
            var convertor = this_1.convertors[node.type];
            if (!convertor) {
                return "continue";
            }
            var skipped = false;
            var context = {
                entering: entering,
                leaf: !isContainer(node),
                options: this_1.options,
                getChildrenText: getChildrenText,
                skipChildren: function () {
                    skipped = true;
                },
            };
            var converted = isCustomBlock(node) || isCustomInline(node)
                ? convertor(node, context, this_1.convertors)
                : convertor(node, context);
            if (converted) {
                var htmlNodes = Array.isArray(converted) ? converted : [converted];
                htmlNodes.forEach(function (htmlNode, index) {
                    if (htmlNode.type === 'openTag' && _this.options.nodeId && index === 0) {
                        if (!htmlNode.attributes) {
                            htmlNode.attributes = {};
                        }
                        htmlNode.attributes['data-nodeid'] = String(node.id);
                    }
                    _this.renderHTMLNode(htmlNode);
                });
                if (skipped) {
                    walker.resumeAt(node, false);
                    walker.next();
                }
            }
        };
        var this_1 = this;
        while ((event = walker.next())) {
            _loop_1();
        }
        this.addNewLine();
        return this.buffer.join('');
    };
    Renderer.prototype.renderHTMLNode = function (node) {
        switch (node.type) {
            case 'openTag':
            case 'closeTag':
                this.renderElementNode(node);
                break;
            case 'text':
                this.renderTextNode(node);
                break;
            case 'html':
                this.renderRawHtmlNode(node);
                break;
            // no-default-case
        }
    };
    Renderer.prototype.generateOpenTagString = function (node) {
        var _this = this;
        var tagName = node.tagName, classNames = node.classNames, attributes = node.attributes;
        this.buffer.push("<" + tagName);
        if (classNames && classNames.length > 0) {
            this.buffer.push(" class=\"" + classNames.join(' ') + "\"");
        }
        if (attributes) {
            Object.keys(attributes).forEach(function (attrName) {
                var attrValue = attributes[attrName];
                _this.buffer.push(" " + attrName + "=\"" + attrValue + "\"");
            });
        }
        if (node.selfClose) {
            this.buffer.push(' /');
        }
        this.buffer.push('>');
    };
    Renderer.prototype.generateCloseTagString = function (_a) {
        var tagName = _a.tagName;
        this.buffer.push("</" + tagName + ">");
    };
    Renderer.prototype.addNewLine = function () {
        if (this.buffer.length && last(last(this.buffer)) !== '\n') {
            this.buffer.push('\n');
        }
    };
    Renderer.prototype.addOuterNewLine = function (node) {
        if (node.outerNewLine) {
            this.addNewLine();
        }
    };
    Renderer.prototype.addInnerNewLine = function (node) {
        if (node.innerNewLine) {
            this.addNewLine();
        }
    };
    Renderer.prototype.renderTextNode = function (node) {
        this.buffer.push(escapeXml(node.content));
    };
    Renderer.prototype.renderRawHtmlNode = function (node) {
        this.addOuterNewLine(node);
        this.buffer.push(node.content);
        this.addOuterNewLine(node);
    };
    Renderer.prototype.renderElementNode = function (node) {
        if (node.type === 'openTag') {
            this.addOuterNewLine(node);
            this.generateOpenTagString(node);
            if (node.selfClose) {
                this.addOuterNewLine(node);
            }
            else {
                this.addInnerNewLine(node);
            }
        }
        else {
            this.addInnerNewLine(node);
            this.generateCloseTagString(node);
            this.addOuterNewLine(node);
        }
    };
    return Renderer;
}());

export { Parser, Renderer, ToastMark };
