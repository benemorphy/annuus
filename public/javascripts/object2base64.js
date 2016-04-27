public static string SerializeBase64(object o)
{
    // Serialize to a base 64 string
    byte[] bytes;
    long length = 0;
    MemoryStream ws = new MemoryStream();
    BinaryFormatter sf = new BinaryFormatter();
    sf.Serialize(ws, o);
    length = ws.Length;
    bytes = ws.GetBuffer();
    string encodedData = bytes.Length + ":" + Convert.ToBase64String(bytes, 0, bytes.Length, Base64FormattingOptions.None);
    return encodedData;
}