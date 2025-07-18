class Color {
  static Random(): string {
    const randomColor = Math.floor(Math.random() * 16777215);
    
    const hexColor = randomColor.toString(16).padStart(6, '0');
    
    return `#${hexColor}`;
  }
}

export default Color;
