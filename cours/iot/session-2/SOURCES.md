# Session 2 — Official technical sources

These sources support the simplified reference stacks used in the session.

- **OASIS — MQTT Version 5.0**  
  https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html  
  MQTT is a client/server publish-subscribe messaging protocol. It requires an underlying ordered, lossless, bidirectional byte stream; TCP is the reference transport used in this course.

- **RFC 7252 — Constrained Application Protocol (CoAP)**  
  https://www.rfc-editor.org/rfc/rfc7252.html  
  CoAP is a resource-oriented application protocol for constrained nodes and networks. The base specification carries CoAP messages over UDP datagrams.

- **RFC 7641 — Observing Resources in CoAP**  
  https://www.rfc-editor.org/rfc/rfc7641.html  
  Defines CoAP Observe, used here only to explain why CoAP can also support update-style interactions in some designs.

- **RFC 9112 — HTTP/1.1**  
  https://www.rfc-editor.org/rfc/rfc9112.html  
  The Session 2 reference HTTP stack uses HTTP/1.1 over TCP/IP. This is deliberately version-specific: later HTTP versions can use different transports.

- **RFC 9293 — Transmission Control Protocol (TCP)**  
  https://www.rfc-editor.org/rfc/rfc9293.html  
  Current TCP Internet Standard.

- **RFC 768 — User Datagram Protocol (UDP)**  
  https://www.rfc-editor.org/rfc/rfc768.html  
  UDP provides datagram transport with minimal mechanism; UDP itself does not guarantee delivery or ordering.

- **Thread Group — What is Thread?**  
  https://threadgroup.org/what-Is-thread/overview  
  Thread is an IPv6-based, low-power networking protocol built on IEEE 802.15.4 MAC/PHY.

- **Thread Group — Why Thread chose IPv6**  
  https://threadgroup.org/Newsroom/Blog/why-thread-chose-ipv6  
  Explains Thread's IPv6 + 6LoWPAN + IEEE 802.15.4 foundation.

- **Thread Group — IPv6-based Thread networks in an IPv4 enterprise network**  
  https://threadgroup.org/Newsroom/Blog/ipv6-based-thread-networks-in-an-ipv4-based-enterprise-network  
  Describes the 6LoWPAN adaptation between IPv6 and IEEE 802.15.4 and the role of Thread Border Routers.

- **IEEE 802.11-2024**  
  https://standards.ieee.org/ieee/802.11/10548/  
  IEEE 802.11 specifies WLAN MAC and PHY functions; this supports the course placement of Wi-Fi in the local connectivity part of the stack.

## Semantic-interoperability references

- **RFC 8428 — Sensor Measurement Lists (SenML)**  
  https://www.rfc-editor.org/rfc/rfc8428.html

- **W3C — Web of Things Thing Description 1.1**  
  https://www.w3.org/TR/wot-thing-description11/

## Scope note

The four-row stack is a teaching model based on communication responsibilities. It is intentionally not a claim that every real-world technology suite maps to exactly one OSI layer. Thread, LoRaWAN and cellular systems can span multiple lower-layer/network responsibilities. Session 2 uses the model to prevent category errors, not to erase those implementation details.
