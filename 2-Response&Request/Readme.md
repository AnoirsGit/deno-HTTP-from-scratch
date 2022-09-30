# Building a HTTP Server from scratch: Understanding Request & Response

[`Uint8Array`](https://www.youtube.com/watch?v=9X8ImwdmikU) - A Typed Array is an array that can only hold a specific amount of bit per item.
By the way, a bit is like a binary; 0 or 1 while a byte is typically 8 bits.

```
00000000 -> 0
00000001 -> 1
01000001 -> 65
```

The table encodes every character that you may find on an American keyboard plus some special character like `null`.
In the late 80', early 90' the International Organization for Standardization, ISO, came up with a new encoding table to
standardize international character set; from East-European, to Greek, to Arabic, to Japanese. This table is known as UTF-8.
Today it encodes 154 languages and all the emojis. The UTF-8 encoding is used on 97% of all web pages.

So back to `Uint8Array`. The Web API specify a pair called `TextEncoder` and `TextDecoder`.
They are used to convert a string to a Uint8Array of UTF-8 encoded text and vice-versa.
So for example, if type `new TextEncoder().encode("A")`, we'll get a `Uint8Array` of 1 byte represented as 65. So the
code 65 is the capital letter "A".

## HTTP

`HTTP/1.1 200 OK\r\nContent-Length: 12\r\nContent-Type: text/plain\r\n\r\nHello, World` - is how http looks like, where `\r\n\r\n` is splitter between header and body
