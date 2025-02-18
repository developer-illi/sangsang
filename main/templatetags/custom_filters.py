from django import template

register = template.Library()

@register.filter(name='padd')
def linebreaks_to_p(value):
    # 줄바꿈을 기준으로 텍스트를 분리하고, 각 줄을 <p> 태그로 감싸기
    paragraphs = value.split('\n')
    wrapped_text = ''.join(f'<p>{paragraph.strip()}</p>' for paragraph in paragraphs if paragraph.strip())
    return wrapped_text

linebreaks_to_p.is_safe = True  # HTML로 안전하게 처리


@register.filter(name='order')
def sort_by_pk(queryset):
    return queryset.order_by("pk")  # 오름차순 정렬
    # return queryset.order_by("-pk")  # 내림차순 정렬 (내림차순 필요하면 사용)