import clsx from 'clsx';
import { useContext } from 'react';
import { Attributes, FightInfo } from '../../../shared';
import { ArenaContext } from '../../../../context';

const ArenaCard = ({ fighter, result }) => {
  const { removeFromArena } = useContext(ArenaContext);

  return (
    <div
      className={clsx(
        'relative p-3 flex flex-col w-1/6 min-w-56 min-h-[386px] gap-4 shadow-customShadow rounded overflow-hidden transition',
        result !== fighter.name && result && 'opacity-35'
      )}
    >
      <FightInfo stats={fighter.stats} />
      <button
        className="absolute top-2 right-2"
        onClick={() => removeFromArena(fighter.name)}
      >
        <img
          className="w-8 border-2 p-1 rounded border-transparent hover:border-customGrey opacity-50 hover:opacity-100"
          src="./src/icons/remove.png"
          alt="Remove"
        />
      </button>

      <img
        src={fighter.sprites.front_default}
        alt={`${fighter.name} image`}
        className="w-3/4 self-center"
      />
      <p className="font-semibold capitalize text-xl md:text-2xl">{fighter.name}</p>
      <Attributes data={fighter} />
    </div>
  );
};

export default ArenaCard;
