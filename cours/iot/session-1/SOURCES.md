# Session 1 — technical and visual sources

The student cards intentionally avoid simplistic fixed range tables. Quantitative characteristics depend on PHY/profile, frequency band, regulation, environment, traffic pattern, topology, implementation and deployment.

## Technical references

- IEEE 802.11 standard family — Wireless LAN PHY/MAC: https://standards.ieee.org/ieee/802.11/10548/
- IEEE 802.15.4 standard family — Low-rate wireless PHY/MAC: https://standards.ieee.org/ieee/802.15.4/11041/
- Bluetooth SIG — Bluetooth technology overview, including LE data rates/topologies: https://www.bluetooth.com/learn-about-bluetooth/tech-overview/
- Bluetooth SIG — Feature enhancements, including LE 2M and LE Coded PHY trade-offs: https://www.bluetooth.com/learn-about-bluetooth/feature-enhancements/
- LoRa Alliance — LoRaWAN for Developers: https://lora-alliance.org/lorawan-for-developers/
- LoRa Alliance — LoRaWAN Regional Parameters: https://resources.lora-alliance.org/technical-specifications/rp002-1-0-5-lorawan-regional-parameters
- LoRa Alliance — LoRaWAN specification material describing Class A/B/C and ADR: https://lora-alliance.org/resource_hub/lorawan-specification-v1-0-2/
- GSMA — Mobile IoT Deployment Guide (2026), NB-IoT and LTE-M complementary profiles through Release 17: https://www.gsma.com/solutions-and-impact/technologies/internet-of-things/wp-content/uploads/2026/02/Mobile-IoT-Deployment-Guide-digital-1.pdf
- 3GPP — TR 36.763, Study on NB-IoT/eMTC support for Non-Terrestrial Networks, Release 17: https://portal.3gpp.org/desktopmodules/Specifications/SpecificationDetails.aspx?specificationId=3747
- 3GPP — Rel-17 work item, NB-IoT/eMTC support for Non-Terrestrial Networks: https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=920069


## Visual assets

The course UI is self-contained. The opening IoT landscape visual is rendered with HTML/CSS and does not depend on an external image request.

## Projector Reality Check references

The Projector uses a small number of concrete figures after the conceptual discussion. They are labelled as protocol/physical rates or worked assumptions, not application-throughput benchmarks.

- Bluetooth SIG — Bluetooth LE primer. LE protocol data rates: 1 Mb/s (LE 1M), 2 Mb/s (LE 2M), 500 kb/s (LE Coded S=2), 125 kb/s (LE Coded S=8): https://www.bluetooth.com/bluetooth-le-primer/
- LoRa Alliance — RP002-1.0.5, current LoRaWAN Regional Parameters (EU863-870 includes the low-rate LoRa PHY operating points used in the Reality Check): https://resources.lora-alliance.org/technical-specifications/rp002-1-0-5-lorawan-regional-parameters
- IEEE — current 802.15.4 description: PHY and MAC specifications for low-data-rate wireless connectivity: https://standards.ieee.org/ieee/802.15.4/11041/
- GSMA — Mobile IoT Deployment Guide (2026): NB-IoT and LTE-M deployment/configuration guidance: https://www.gsma.com/solutions-and-impact/technologies/internet-of-things/wp-content/uploads/2026/02/Mobile-IoT-Deployment-Guide-digital-1.pdf

The STOP 3 traffic figures are intentionally **worked scenarios**, not measurements: 30 nodes × four 32-bit values × one report/minute gives 480 raw bytes/minute, or about 0.69 MB/day before protocol overhead. The camera contrast assumes a 100 kB image every 5 seconds (about 1.73 GB/day).
