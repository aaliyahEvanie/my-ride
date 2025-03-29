import { BikeObject } from "./bike-object";

export interface Bikedetail extends BikeObject {
    registration_created_at: number;
    registration_updated_at: number;
    api_url: string;
    manufacturer_id: number;
    paint_description: string | null;
    name: string | null;
    frame_size: string | null;
    rear_tire_narrow: boolean;
    front_tire_narrow: boolean | null;
    type_of_cycle: string;
    test_bike: boolean;
    rear_wheel_size_iso_bsd: number | null;
    front_wheel_size_iso_bsd: number | null;
    handlebar_type_slug: string | null;
    frame_material_slug: string | null;
    front_gear_type_slug: string | null;
    rear_gear_type_slug: string | null;
    extra_registration_number: string | null;
    additional_registration: string | null;
    stolen_record: StolenRecord;
    public_images: PublicImage[];
    components: any[];
}

interface StolenRecord {
    date_stolen: number;
    location: string;
    latitude: number;
    longitude: number;
    theft_description: string | null;
    locking_description: string | null;
    lock_defeat_description: string | null;
    police_report_number: string | null;
    police_report_department: string | null;
    created_at: number;
    create_open311: boolean;
    id: number;
  }
  
  // Public image details
  interface PublicImage {
    name: string;
    full: string;
    large: string;
    medium: string;
    thumb: string;
    id: number;
  }