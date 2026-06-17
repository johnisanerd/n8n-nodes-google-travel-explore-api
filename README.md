# n8n-nodes-google-travel-explore-api

An [n8n](https://n8n.io/) community node that discovers destinations from a departure airport using Google Travel Explore and returns structured trip ideas: destination, flight price, hotel price, dates, and airline. It is backed by the [Google Travel Explore API](https://apify.com/johnvc/google-travel-explore-api?fpr=9n7kx3) on [Apify](https://apify.com?fpr=9n7kx3) and bills per result, so there are no subscriptions and no minimums.

[Installation](#installation) · [Credentials](#credentials) · [Operations](#operations) · [Output](#output) · [Example workflows](#example-workflows) · [Pricing](#pricing) · [Resources](#resources)

## What it does

Give the node a departure airport, and it returns one item per destination with the name, country, flight price, hotel price, flight duration, number of stops, airline, and suggested trip dates. It also works as an **AI Agent tool**, so an agent can suggest trips on demand.

- Explore destinations and deals from any departure airport
- Localize with a country code and language code
- Control how many destinations to return
- Choose how much data to return per destination: Simplified, Raw, or Selected Fields

## Installation

Follow the n8n [community nodes installation guide](https://docs.n8n.io/integrations/community-nodes/installation/):

1. In n8n, open **Settings > Community Nodes**.
2. Select **Install**.
3. Enter `n8n-nodes-google-travel-explore-api` as the npm package name.
4. Agree to the risks of using community nodes, then select **Install**.

After it installs, the **Google Travel Explore** node appears in the nodes panel.

> n8n Cloud only allows verified community nodes. Until this node is verified, install it on a self-hosted n8n instance.

## Credentials

You need a free [Apify account](https://apify.com?fpr=9n7kx3) and an API token.

1. Sign in to the [Apify Console](https://console.apify.com?fpr=9n7kx3).
2. Open **Settings > Integrations** and copy your **Personal API token**.
3. In n8n, create a new **Apify API** credential and paste the token.
4. Use the credential's **Test** button to confirm it works.

The node also supports **Apify OAuth2** if you prefer to connect that way.

## Operations

**Destination > Explore** returns destinations from a departure airport.

| Parameter | Description |
| --- | --- |
| Departure Airport | The departure airport IATA code. Required. |
| Country Code / Language Code | Localization, for example `us` and `en`. |
| Maximum Results per Departure | How many destinations to return. |
| Output | How much data to return: Simplified, Raw, or Selected Fields. |

## Output

Each destination is returned as its own n8n item. The API returns more than ten fields per destination, so the **Output** parameter lets you choose how much to return:

- **Simplified** (default): a compact object with `name`, `country`, `flightPrice`, `hotelPrice`, `flightDuration`, `numberOfStops`, `airline`, `startDate`, `endDate`, and `link`. This mode is also used automatically when the node runs as an AI Agent tool, to keep responses small.
- **Raw**: every field the API returns for each destination, using the original field names below.
- **Selected Fields**: pick exactly which fields to include.

### Fields (Raw and Selected Fields)

| Field | Type | Description |
| --- | --- | --- |
| `departure_id` | string | Departure airport code |
| `position` | integer | Rank in the results |
| `name` | string | Destination name |
| `country` | string | Destination country |
| `destination_id` | string | Google destination identifier |
| `destination_airport` | object | Destination airport details |
| `gps_coordinates` | object | Latitude and longitude |
| `flight_price` | number | Round-trip flight price |
| `hotel_price` | number | Estimated hotel price |
| `flight_duration` | integer | Flight duration in minutes |
| `number_of_stops` | integer | Number of stops |
| `airline` | string | Airline name |
| `airline_code` | string | Airline code |
| `start_date` | string | Suggested trip start date |
| `end_date` | string | Suggested trip end date |
| `link` | string | Link to the trip on Google Travel |
| `thumbnail` | string | Destination thumbnail URL |

## Example workflows

### 1. Weekly cheap-destination digest

1. **Schedule Trigger**: run weekly.
2. **Google Travel Explore**: Departure Airport your home airport, Output `Simplified`.
3. **Sort** by `flightPrice`, then **Send Email** with the cheapest options.

### 2. Deal alerts under a budget

1. **Schedule Trigger**: run daily.
2. **Google Travel Explore**: your airport.
3. **Filter**: keep destinations where `flightPrice` is below your target; **Slack** the matches.

### 3. Let an AI Agent suggest trips

1. **AI Agent** node.
2. Attach **Google Travel Explore** as a tool.
3. Ask "Where can I fly cheaply from JFK next month?" The agent calls the node (in Simplified mode) and suggests destinations.

## Pricing

This node calls the [Google Travel Explore API](https://apify.com/johnvc/google-travel-explore-api?fpr=9n7kx3) on Apify, which is billed **pay-per-result**, with no subscription and no minimums. Apify also includes a free monthly usage tier that covers typical volumes. See the [Actor page](https://apify.com/johnvc/google-travel-explore-api?fpr=9n7kx3) for current rates.

## Resources

- [Google Travel Explore API on Apify](https://apify.com/johnvc/google-travel-explore-api?fpr=9n7kx3)
- [npm package](https://www.npmjs.com/package/n8n-nodes-google-travel-explore-api)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Apify n8n integration guide](https://docs.apify.com/platform/integrations/n8n)

## License

[MIT](LICENSE.md)
