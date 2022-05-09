import React from 'react';

function Sidebar(props) {
  let sizes = props.products.reduce((prev, curr) => {
    prev = prev.concat(curr.availableSizes);
    return prev;
  }, []);
  let uniqueSizes = [...new Set(sizes)];

  return (
    <aside className='flex-20 sidebar'>
      <h2 className='filter-heading'>Sizes:</h2>
      <div className='size-holder padd-2'>
        <ul className='flex gap-1 wrap'>
          {uniqueSizes.map((size) => {
            return (
              <li key={size} onClick={() => props.handleFilterBySize(size)}>
                <span
                  className={
                    props.selectedSizes.includes(size)
                      ? 'active btn size'
                      : 'btn size'
                  }
                >
                  {size}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;