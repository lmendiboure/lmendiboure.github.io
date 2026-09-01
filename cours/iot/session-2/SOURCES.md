# Session 2 — Official technical sources

These links support the technical facts used in the student workspace, Projector reality checks and instructor notes.

- **Thread Group — What is Thread? / Overview**  
  https://threadgroup.org/what-Is-thread/overview  
  Thread is a secure, low-power IPv6-based mesh networking protocol built on IEEE 802.15.4.

- **Thread Group — Thread 1.4 resources**  
  https://threadgroup.org/resources  
  Current Thread resources and specification information.

- **Thread Group — Why Thread chose IPv6**  
  https://threadgroup.org/Newsroom/Blog/why-thread-chose-ipv6  
  Explains the 802.15.4 + 6LoWPAN + IPv6 foundation and layered design.

- **OASIS — MQTT Version 5.0**  
  https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html  
  MQTT is a client/server publish-subscribe messaging protocol. It requires an ordered, lossless, bidirectional underlying transport; TCP is a common choice.

- **RFC 7252 — Constrained Application Protocol (CoAP)**  
  https://www.rfc-editor.org/rfc/rfc7252.html  
  CoAP is a RESTful application protocol for constrained nodes and networks, canonically using datagram transport such as UDP with optional message-layer reliability.

- **RFC 7641 — Observing Resources in CoAP**  
  https://www.rfc-editor.org/rfc/rfc7641.html  
  Defines CoAP Observe for keeping a resource representation updated over time.

- **RFC 9293 — Transmission Control Protocol (TCP)**  
  https://www.rfc-editor.org/rfc/rfc9293.html  
  Current TCP Internet Standard specification.

- **RFC 768 — User Datagram Protocol (UDP)**  
  https://www.rfc-editor.org/rfc/rfc768.html  
  UDP offers datagram communication with minimal mechanism; delivery and duplicate protection are not guaranteed.

- **RFC 9110 — HTTP Semantics**  
  https://www.rfc-editor.org/rfc/rfc9110.html  
  HTTP is an application-level request/response protocol; transport differs across HTTP versions.


## Interoperability and semantic step-further references

- **RFC 8428 — Sensor Measurement Lists (SenML)**  
  https://www.rfc-editor.org/rfc/rfc8428.html  
  A standard model and encodings for sensor measurements and parameters.

- **RFC 6690 — Constrained RESTful Environments (CoRE) Link Format**  
  https://www.rfc-editor.org/rfc/rfc6690.html  
  Resource discovery for constrained RESTful environments, including the `/.well-known/core` convention.

- **W3C — Web of Things (WoT) Thing Description 1.1**  
  https://www.w3.org/TR/wot-thing-description11/  
  W3C Recommendation describing metadata and interfaces of Things, including Properties, Actions and Events.


## Delivery semantics and guarantee boundaries

- **OASIS MQTT Version 5.0 — QoS semantics**  
  https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html  
  Defines QoS 0 as at-most-once message delivery, QoS 1 as at-least-once (duplicates can occur), and QoS 2 as exactly-once at the MQTT message-delivery scope. MQTT expects an ordered, lossless, bidirectional underlying connection.

- **RFC 7252 — CoAP message reliability**  
  https://www.rfc-editor.org/rfc/rfc7252.html  
  Confirmable messages are acknowledged and retransmitted; CoAP includes duplicate detection. An acknowledgement confirms receipt of a Confirmable message and does not, by itself, prove successful physical actuation.

- **RFC 9293 — TCP**  
  https://www.rfc-editor.org/rfc/rfc9293.html  
  TCP provides applications with a reliable, in-order byte-stream service. This is a transport guarantee, not an application exactly-once-operation guarantee.

- **RFC 768 — UDP**  
  https://www.rfc-editor.org/rfc/rfc768.html  
  UDP is datagram-oriented; delivery and duplicate protection are not guaranteed by the protocol.
