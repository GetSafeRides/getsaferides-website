import cadillacEscaladeImage from '@assets/vehicles-images/cadillac_escalade_gmc_yukon_denali.png';
import lexusRxImage from '@assets/vehicles-images/lexus_rx_350_rx_450h.png';
import toyotaLandCruiserImage from '@assets/vehicles-images/toyota_land_cruiser_vxr__300_series.png';
import { FaUsers } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import { RiShieldCheckFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

type FleetItem = {
  name: string;
  descriptor: string;
  capacity: string;
  availability: string;
  imageUrl: string;
};

function FleetSection() {
  const fleet: FleetItem[] = [
    {
      name: 'Toyota Land Cruiser VXR / 300 Series',
      descriptor: 'Class 4 Armored SUV',
      capacity: '4 Passengers',
      availability: '24/7',
      imageUrl: toyotaLandCruiserImage,
    },
    {
      name: 'Lexus RX 450h',
      descriptor: 'Smooth ride, locally popular',
      capacity: '4 Passengers',
      availability: 'Elite',
      imageUrl: lexusRxImage,
    },
    {
      name: 'Cadillac Escalade',
      descriptor: 'Presidential convoy setups',
      capacity: '6 Passengers',
      availability: 'On Demand',
      imageUrl: cadillacEscaladeImage,
    },
  ];

  return (
    <section className="bg-darkSurface py-[120px]" id="fleet">
      <div className="mx-auto w-full max-w-[1260px] px-6 md:px-8">
        <div className="mx-auto w-full max-w-[1196px]">
          <div className="mb-12 flex items-end justify-between">
            <h2 className="font-display text-5xl font-bold tracking-tight text-onSurface">
              The Fleet
            </h2>
            <Link
              className="hidden items-center gap-2 text-sm font-medium text-primary transition-opacity hover:opacity-85 md:flex"
              to="/fleet"
            >
              <span>View All Fleet</span>
              <FiArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {fleet.map((item) => (
              <article
                key={item.name}
                className="overflow-hidden border border-borderColor/40 bg-card/90"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-64 w-full object-cover"
                />
                <div className="space-y-3 p-6">
                  <h3 className="font-display text-[28px] font-bold leading-tight text-onSurface">
                    {item.name}
                  </h3>
                  <p className="text-sm text-subdued">{item.descriptor}</p>
                  <div className="flex items-center justify-between border-t border-borderColor/40 pt-4 text-sm text-primary">
                    <span className="flex items-center gap-2">
                      <FaUsers className="size-3.5" />
                      {item.capacity}
                    </span>
                    <span className="flex items-center gap-2">
                      <RiShieldCheckFill className="size-4" />
                      {item.availability}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FleetSection;
