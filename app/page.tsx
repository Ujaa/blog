export default function Page() {
  return (
    <section className="xl:max-w-6xl m-auto px-4 xl:px-0 w-full">
      <h1 className="font-semibold text-4xl mb-8 tracking-tighter">About</h1>

      <div className="max-w-md">
        <p className="font-medium text-xl text-neutral-900 dark:text-neutral-50 mb-3 leading-8 tracking-tight">
          클릭 한 번에도 작은 즐거움을 만드는 <br />
          프론트엔드 개발자 이유진입니다.
        </p>
        <p className="keep-all text-neutral-600 leading-7 tracking-tight ">
          IT공학과 시각영상디자인을 공부하며 디자인은 단순히 보는 것이 아니라
          <em>느끼는 경험</em>이라는 사실을 배웠습니다. 그때부터 사용자가 웹에서
          마주하는 모든 순간을 좀 더 의미 있게 만들고 싶어졌습니다. 작은
          인터랙션 하나하나가 모여서 <em>이 사이트는 뭔가 다르다</em>라는 느낌을
          주는 개발자가 되고 싶습니다. 기획자와 디자이너의 의도를 정확히
          구현하면서도 성능도 챙기려고 합니다. 사용자 플로우는 자연스럽게,
          그러면서도 시각적으로는 재미있는 웹을 만드는 게 목표입니다.
        </p>
      </div>
    </section>
  );
}
