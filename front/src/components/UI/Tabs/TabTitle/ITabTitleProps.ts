export default interface ITabTitleProps {
    title: string
    index: number
    changeTab: (e: React.MouseEvent<HTMLDivElement>, index: number) => void
    activeIndex: number
}