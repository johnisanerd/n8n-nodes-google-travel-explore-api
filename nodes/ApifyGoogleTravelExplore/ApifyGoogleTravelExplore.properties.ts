import { IExecuteFunctions, INodeProperties } from 'n8n-workflow';

/**
 * Build the Apify Actor input from node parameters.
 * Only the real Actor inputs are sent; the Output / Fields parameters shape the
 * data we return, they are not part of the Actor input.
 */
export function buildActorInput(
	context: IExecuteFunctions,
	itemIndex: number,
	defaultInput: Record<string, any>,
): Record<string, any> {
	return {
		...defaultInput,
		departureId: context.getNodeParameter('departureId', itemIndex),
		gl: context.getNodeParameter('gl', itemIndex),
		hl: context.getNodeParameter('hl', itemIndex),
		maxResultsPerDeparture: context.getNodeParameter('maxResultsPerDeparture', itemIndex),
	};
}

const resourceProperties: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Destination',
				value: 'destination',
			},
		],
		default: 'destination',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['destination'],
			},
		},
		options: [
			{
				name: 'Explore',
				value: 'explore',
				action: 'Explore destinations from an airport',
				description: 'Discover destinations from a departure airport, one item per destination',
			},
		],
		default: 'explore',
	},
];

const actorProperties: INodeProperties[] = [
	{
		displayName: 'Departure Airport',
		name: 'departureId',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. JFK',
		description: 'The departure airport IATA code to explore destinations from',
		displayOptions: { show: { resource: ['destination'], operation: ['explore'] } },
	},
	{
		displayName: 'Country Code',
		name: 'gl',
		type: 'string',
		default: 'us',
		placeholder: 'e.g. us',
		description: 'Two-letter country code the search runs from',
		displayOptions: { show: { resource: ['destination'], operation: ['explore'] } },
	},
	{
		displayName: 'Language Code',
		name: 'hl',
		type: 'string',
		default: 'en',
		placeholder: 'e.g. en',
		description: 'Two-letter language code for the results',
		displayOptions: { show: { resource: ['destination'], operation: ['explore'] } },
	},
	{
		displayName: 'Maximum Results per Departure',
		name: 'maxResultsPerDeparture',
		type: 'number',
		default: 50,
		typeOptions: { minValue: 1 },
		description: 'How many destinations to return',
		displayOptions: { show: { resource: ['destination'], operation: ['explore'] } },
	},
];

const outputProperties: INodeProperties[] = [
	{
		displayName: 'Output',
		name: 'output',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['destination'], operation: ['explore'] } },
		options: [
			{
				name: 'Raw',
				value: 'raw',
				description: 'Return every field the API produces for each destination',
			},
			{
				name: 'Selected Fields',
				value: 'selected',
				description: 'Choose exactly which fields to return',
			},
			{
				name: 'Simplified',
				value: 'simplified',
				description: 'Return a compact set of the most useful destination fields',
			},
		],
		default: 'simplified',
		description: 'How much data to return for each destination',
	},
	{
		displayName: 'Fields to Include',
		name: 'fields',
		type: 'multiOptions',
		displayOptions: {
			show: { resource: ['destination'], operation: ['explore'], output: ['selected'] },
		},
		options: [
			{ name: 'Airline', value: 'airline' },
			{ name: 'Airline Code', value: 'airline_code' },
			{ name: 'Country', value: 'country' },
			{ name: 'Departure ID', value: 'departure_id' },
			{ name: 'Destination Airport', value: 'destination_airport' },
			{ name: 'Destination ID', value: 'destination_id' },
			{ name: 'End Date', value: 'end_date' },
			{ name: 'Flight Duration', value: 'flight_duration' },
			{ name: 'Flight Price', value: 'flight_price' },
			{ name: 'GPS Coordinates', value: 'gps_coordinates' },
			{ name: 'Hotel Price', value: 'hotel_price' },
			{ name: 'Link', value: 'link' },
			{ name: 'Name', value: 'name' },
			{ name: 'Number of Stops', value: 'number_of_stops' },
			{ name: 'Position', value: 'position' },
			{ name: 'Start Date', value: 'start_date' },
			{ name: 'Thumbnail', value: 'thumbnail' },
		],
		default: ['name', 'country', 'flight_price', 'hotel_price', 'start_date'],
		description: 'Which fields to return when Output is set to Selected Fields',
	},
];

const authenticationProperties: INodeProperties[] = [
	{
		displayName: 'Authentication',
		name: 'authentication',
		type: 'options',
		options: [
			{
				name: 'API Key',
				value: 'apifyApi',
			},
			{
				name: 'OAuth2',
				value: 'apifyOAuth2Api',
			},
		],
		default: 'apifyApi',
		description: 'Choose which authentication method to use',
	},
];

export const properties: INodeProperties[] = [
	...resourceProperties,
	...actorProperties,
	...outputProperties,
	...authenticationProperties,
];
