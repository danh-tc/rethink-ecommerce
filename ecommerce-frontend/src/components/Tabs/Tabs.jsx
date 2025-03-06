import { Tabs } from "@base-ui-components/react/tabs";
import PropTypes from "prop-types";
import "./_tab.scss";

export default function RethinkTabs({ tabs = [] }) {
  return (
    <Tabs.Root defaultValue={tabs[0].tabTitle} className="rethink-tabs">
      <Tabs.List className="rethink-tabs__buttons">
        {tabs.map((tab, index) => (
          <Tabs.Tab
            className="tab-button"
            value={tab.tabTitle}
            key={tab + index}
          >
            {tab.tabTitle}
          </Tabs.Tab>
        ))}
        <Tabs.Indicator className="tab-button--selected" />
      </Tabs.List>
      {tabs.map(
        (tab, index) =>
          tab.tabContent && (
            <Tabs.Panel
              className="rethink-tabs__content"
              value={tab.tabTitle}
              key={tab + index}
              dangerouslySetInnerHTML={{ __html: tab.tabContent }}
            ></Tabs.Panel>
          )
      )}
    </Tabs.Root>
  );
}

RethinkTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabTitle: PropTypes.string.isRequired,
      tabContent: PropTypes.string,
    })
  ).isRequired,
};
