export const LF = 0x0a;
export const FS = 0x1c;
export const FF = 0x0c;
export const GS = 0x1d;
export const DLE = 0x10;
export const EOT = 0x04;
export const NUL = 0x00;
export const ESC = 0x1b;
export const TAB = 0x74;
export const EOL = '\n';

// Feed control sequences

// Print and line feed
export const CONTROL_LINE_FEED = 0x0a;

// ESC d n
// Print and feed n lines
export const printAndFeedNLines = ( n = 0 ) => [ ESC, 0x64, n ];

// Print and feed paper (without spaces between lines)
export const CONTROL_GLF =  [ 0x4a, 0x00 ];

// Form feed
export const CONTROL_FORM_FEED = 0x0c;

// Carriage return
export const CONTROL_CARIAGE_RETURN = 0x0d;

// Horizontal tab
export const CONTROL_HORIZONTAL_TAB = 0x09;

// Vertical tab
export const CONTROL_VERTICAL_TAB = 0x0b;

// Characeter spacing
export const CHARACTER_SPACING_DEFAULT = [ ESC, 0x20, 0x00 ];
export const CHARACTER_SPACING_SET = [ ESC, 0x20 ];

// Line spacing
export const LINE_SPACING_DEFAULT =  [ ESC, 0x32 ];
export const LINE_SPACING_SET =  [ ESC, 0x33 ];

// Hardware
// Clear data in buffer and reset modes
export const HARDWARE_INIT = [ ESC, 0x40];
// Printer select
export const  HARDWARE_SELECT =  [ ESC, 0x3d, 0x01 ];
// Reset printer hardware
export const HARDWARE_RESET = [ ESC, 0x3f, 0x0a, 0x00 ];

// Cash drawer

// Sends a pulse to pin 2 []
export const CASH_DRAWER_KICK_2 = [ ESC, 0x70, 0x00, 0x19, 0xfa ];

// Sends a pulse to pin 5 []
export const CASH_DRAWER_KICK_5 = [ ESC, 0x70, 0x01, 0x19, 0xfa ];

// Underline

// Underline font 1-dot ON
export const TEXT_UNDERLINE_ON = [ ESC, 0x2d, 0x01 ];
// Underline font 2-dot ON
export const TEXT_UNDERLINE2_ON = [ ESC, 0x2d, 0x02 ];
export const TEXT_UNDERLINE_OFF = [ ESC, 0x2d, 0x00 ];

// Bold

export const TEXT_BOLD_ON = [ ESC, 0x45, 0x01 ];
export const TEXT_BOLD_OFF = [ ESC, 0x45, 0x00 ];

// Italic
export const TEXT_ITALIC_ON = [ ESC, 0x34 ];
export const TEXT_ITALIC_OFF = [ ESC, 0x35 ];

// Font types

export const TEXT_FONT_A = [ ESC, 0x4d, 0x00 ];
export const TEXT_FONT_B = [ ESC, 0x4d, 0x01 ];
export const TEXT_FONT_C = [ ESC, 0x4d, 0x02 ];

// Justifications

export const TEXT_JUSTIFY_LEFT = [ ESC, 0x61, 0x00 ];
export const TEXT_JUSTIFY_CENTER = [ ESC, 0x61, 0x01 ];
export const TEXT_JUSTIFY_RIGHT = [ ESC, 0x61, 0x02 ];

// Image

// Set raster image normal size
export const S_RASTER_N = [ 0x1d, 0x76, 0x30, 0x00 ];

// Set raster image double width
export const S_RASTER_2W = [ 0x1d, 0x76, 0x30, 0x01 ];

// Set raster image double height
export const S_RASTER_2H = [ 0x1d, 0x76, 0x30, 0x02 ];

// Set raster image quadruple
export const S_RASTER_Q = [ 0x1d, 0x76, 0x30, 0x03 ];

export const BITMAP_S8 = [ ESC, 0x2a, 0x00 ];
export const BITMAP_D8 = [ ESC, 0x2a, 0x01 ];
export const BITMAP_S24 = [ ESC, 0x2a, 0x20 ];
export const BITMAP_D24 = [ ESC, 0x2a, 0x21 ];

export const GSV0_NORMAL = [ 0x1d, 0x76, 0x30, 0x00 ];
export const GSV0_DW = [ 0x1d, 0x76, 0x30, 0x01 ];
export const GSV0_DH = [ 0x1d, 0x76, 0x30, 0x02 ];
export const GSV0_DWDH = [ 0x1d, 0x76, 0x30, 0x03 ];

// Beep
// Printer Buzzer pre hex
export const BEEP = [ ESC, 0x42 ];

// Margin left

export const MARGIN = [ 29, 76, 50, 0 ];