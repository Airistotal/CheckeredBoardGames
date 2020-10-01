class Utilities {
  public static degreesToRadians(degrees: number): number
  {
    var pi = Math.PI;
    return degrees * (pi/180);
  }
}

export default Utilities;