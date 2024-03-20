import { pgQuery } from "../config/pgclient";
import { Listing, ListingProps } from "../interface/models";

export async function getListings({
  offset,
  limit,
  featured,
}: Partial<ListingProps>): Promise<Listing[]> {
  const queryListing = `SELECT * FROM listings WHERE is_featured = $1 ORDER BY id LIMIT $2 OFFSET $3`;
  const params = [featured, limit, offset];
  const listings = await pgQuery(queryListing, params);

  return listings.rows.map(listingMapper);
}

export async function getListingById({ id }: Partial<ListingProps>): Promise<Listing> {
  try {
    const listing = await pgQuery(`SELECT * FROM listings WHERE id = $1 LIMIT 1`, [id]);

    return listing.rows.map(listingMapper)[0];
  } catch (error) {
    throw new Error("Error fetching listing by ID.");
  }
}

export function listingMapper(row: Listing) {
  row.fees = row.fees.split("|") as any;
  row.photos = row.photos.split("|") as any;
  row.address = row.address.split("|") as any;
  row.ammenities = row.ammenities.split(",") as any;

  return row;
}
