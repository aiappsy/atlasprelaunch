import asyncio
import edge_tts

async def list_us_voices():
    voices = await edge_tts.list_voices()
    us_male = [v for v in voices if v['Locale'] == 'en-US' and v['Gender'] == 'Male']
    for v in us_male:
        print(f"{v['ShortName']} - {v.get('FriendlyName', '')}")

if __name__ == '__main__':
    asyncio.run(list_us_voices())
